'use client'

import { MedicalTest } from '@/server/medical-test/server-types'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { normalizeFilename, slugifyFilename } from '../_utils/utils'
import { notifications } from '@mantine/notifications'
import { massiveTestUpload } from '@/server'
import { useRouter } from 'next/navigation'

type TestFile = {
    id: string
    name: string
    status: 'not-assigned' | 'assigned'
    file?: File
}

type FileReady = {
    id: string
    name: string
    status: 'ready'
    file: File
}

type FileError = {
    name: string
    status: 'error'
}

export type UploadItem = TestFile | FileReady | FileError

interface MassiveUploadContextProps {
    files: UploadItem[]
    patientName: string
    isUploading: boolean
    onUpload: (files: File[]) => void
    onRemove: (name: string) => void
    onSubmit: () => Promise<void>
}

const MassiveUploadContext = createContext<MassiveUploadContextProps | undefined>(undefined)

export const useMassiveUpload = () => {
    const context = useContext(MassiveUploadContext)
    if (!context) {
        throw new Error('useMassiveUpload must be used within a MassiveUploadProvider');
    }

    return context
}

export const MassiveUploadProvider: React.FC<{
    tests: MedicalTest[],
    patientName: string,
    children: React.ReactNode
}> = ({ children, patientName, tests }) => {

    const [files, setFiles] = useState<UploadItem[]>([]);
    const [isUploading, setIsUploading] = useState<boolean>(false)
    const router = useRouter();

    useEffect(() => {
        const newFiles: TestFile[] = tests.map(t => ({
            id: t.testId,
            name: t.examName,
            status: t.resultHasFile ? "assigned" : "not-assigned"
        }))
        setFiles(newFiles)
    }, [tests])

    const onUpload = useCallback((newFiles: File[]) => {
        setFiles(currentFiles => {
            let updatedFiles = [...currentFiles]

            for (const newFile of newFiles) {
                const filename = normalizeFilename(newFile.name)

                const index = updatedFiles.findIndex(file => {
                    const newFilename = `${file.name} ${patientName}`
                    return file.status !== 'error' && slugifyFilename(newFilename) === filename
                })

                if (index === -1) {
                    updatedFiles.push({
                        name: newFile.name,
                        status: 'error'
                    })

                    continue
                }

                const currentFile = updatedFiles[index]
                if (currentFile.status === 'error') {
                    continue
                }

                updatedFiles[index] = {
                    ...currentFile,
                    status: 'ready',
                    file: newFile
                }
            }

            return updatedFiles
        })
    }, [patientName])

    const onRemove = useCallback((name: string) => {
        setFiles((f) => f.filter(e => e.status !== "error" && e.name !== name))
    }, [])

    const onSubmit = useCallback(async () => {
        setIsUploading(false)

        const form = new FormData();
        for (const file of files) {
            if (file.status !== "ready") continue;
            form.append(file.id, file.file)
        }

        try {
            await massiveTestUpload(form)
            router.back();
        } catch (error) {
            console.error(error);
            notifications.show({ message: "Error al cargar el archivo", color: "red" })
        } finally {
            setIsUploading(false)
        }
    }, [files, router])

    const value: MassiveUploadContextProps = {
        files,
        patientName,
        isUploading,
        onUpload,
        onRemove,
        onSubmit
    }

    return (
        <MassiveUploadContext.Provider value={value}>
            {children}
        </MassiveUploadContext.Provider>
    )
}