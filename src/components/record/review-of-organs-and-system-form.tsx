'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback, useState } from 'react'
import ReviewOfOrgansAndSystemSchema from './schemas/review-of-organs-and-systems.schema'
import { z } from 'zod';
import { Flex, Grid, GridCol, rem, Stack, Switch, Textarea } from '@mantine/core';

type ReviewOfOrgansAndSystemFormProps = {
    data?: Partial<z.infer<typeof ReviewOfOrgansAndSystemSchema>>;
    onSubmit?: (value: z.infer<typeof ReviewOfOrgansAndSystemSchema>) => void;
}
const ReviewOfOrgansAndSystemForm = React.forwardRef<HTMLFormElement, ReviewOfOrgansAndSystemFormProps>(({
    data,
    onSubmit
}, ref) => {

    const [reviewOfOrgansSkin, setReviewOfOrgansSkin] = useState<boolean>(!!data?.reviewOfOrgansSkin);
    const [reviewOfOrgansSenseOrgans, setReviewOfOrgansSenseOrgans] = useState<boolean>(!!data?.reviewOfOrgansSenseOrgans);
    const [reviewOfOrgansBreath, setReviewOfOrgansBreath] = useState<boolean>(!!data?.reviewOfOrgansBreath);
    const [reviewOfOrgansCardiovascular, setReviewOfOrgansCardiovascular] = useState<boolean>(!!data?.reviewOfOrgansCardiovascular);
    const [reviewOfOrgansDigestive, setReviewOfOrgansDigestive] = useState<boolean>(!!data?.reviewOfOrgansDigestive);
    const [reviewOfOrgansUrinary, setReviewOfOrgansUrinary] = useState<boolean>(!!data?.reviewOfOrgansUrinary);
    const [reviewOfOrgansSkeletalMuscle, setReviewOfOrgansSkeletalMuscle] = useState<boolean>(!!data?.reviewOfOrgansSkeletalMuscle);
    const [reviewOfOrgansEndocrinic, setReviewOfOrgansEndocrinic] = useState<boolean>(!!data?.reviewOfOrgansEndocrinic);
    const [reviewOfOrgansHemoLymphatic, setReviewOfOrgansHemoLymphatic] = useState<boolean>(!!data?.reviewOfOrgansHemoLymphatic);
    const [reviewOfOrgansHighlyStrung, setReviewOfOrgansHighlyStrung] = useState<boolean>(!!data?.reviewOfOrgansHighlyStrung);

    const form = useForm<z.infer<typeof ReviewOfOrgansAndSystemSchema>>({
        initialValues: {
            reviewOfOrgansSkin: data?.reviewOfOrgansSkin ?? '',
            reviewOfOrgansSenseOrgans: data?.reviewOfOrgansSenseOrgans ?? '',
            reviewOfOrgansBreath: data?.reviewOfOrgansBreath ?? '',
            reviewOfOrgansCardiovascular: data?.reviewOfOrgansCardiovascular ?? '',
            reviewOfOrgansDigestive: data?.reviewOfOrgansDigestive ?? '',
            reviewOfOrgansUrinary: data?.reviewOfOrgansUrinary ?? '',
            reviewOfOrgansSkeletalMuscle: data?.reviewOfOrgansSkeletalMuscle ?? '',
            reviewOfOrgansEndocrinic: data?.reviewOfOrgansEndocrinic ?? '',
            reviewOfOrgansHemoLymphatic: data?.reviewOfOrgansHemoLymphatic ?? '',
            reviewOfOrgansHighlyStrung: data?.reviewOfOrgansHighlyStrung ?? '',
        },
        validate: zodResolver(ReviewOfOrgansAndSystemSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof ReviewOfOrgansAndSystemSchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);

    return (
        <form
            ref={ref}
            onSubmit={form.onSubmit(handleSubmit)}>
            <Grid>
                <GridCol span={4}>
                    <Flex direction={{ base: 'row', md: 'column' }} gap={rem(8)}>
                        <Switch
                            label="PIEL - ANEXOS"
                            checked={reviewOfOrgansSkin}
                            onChange={e => setReviewOfOrgansSkin(e.target.checked)} />
                        <Switch
                            label="ORGANOS DE LOS SENTIDOS"
                            checked={reviewOfOrgansSenseOrgans}
                            onChange={e => setReviewOfOrgansSenseOrgans(e.target.checked)} />
                        <Switch
                            label="RESPIRATORIO"
                            checked={reviewOfOrgansBreath}
                            onChange={e => setReviewOfOrgansBreath(e.target.checked)} />
                        <Switch
                            label="CADIO-VASCULAR"
                            checked={reviewOfOrgansCardiovascular}
                            onChange={e => setReviewOfOrgansCardiovascular(e.target.checked)} />
                        <Switch
                            label="DIGESTIVO"
                            checked={reviewOfOrgansDigestive}
                            onChange={e => setReviewOfOrgansDigestive(e.target.checked)} />
                        <Switch
                            label="GENITO - URINARIO"
                            checked={reviewOfOrgansUrinary}
                            onChange={e => setReviewOfOrgansUrinary(e.target.checked)} />
                        <Switch
                            label="MUSCULO ESQUELETICO"
                            checked={reviewOfOrgansSkeletalMuscle}
                            onChange={e => setReviewOfOrgansSkeletalMuscle(e.target.checked)} />
                        <Switch
                            label="ENDOCRINO"
                            checked={reviewOfOrgansEndocrinic}
                            onChange={e => setReviewOfOrgansEndocrinic(e.target.checked)} />
                        <Switch
                            label="HEMO LINFATICO"
                            checked={reviewOfOrgansHemoLymphatic}
                            onChange={e => setReviewOfOrgansHemoLymphatic(e.target.checked)} />
                        <Switch
                            label="NERVIOSO"
                            checked={reviewOfOrgansHighlyStrung}
                            onChange={e => setReviewOfOrgansHighlyStrung(e.target.checked)} />
                    </Flex>
                </GridCol>
                <GridCol span={8}>
                    <Stack
                        gap={rem(32)}
                        align='start' w='100%'>
                        {reviewOfOrgansSkin && <Textarea
                            w='100%'
                            rows={5}
                            label="PIEL - ANEXOS"
                            placeholder="Escriba la observacion aqui"
                            {...form.getInputProps('reviewOfOrgansSkin')} />}
                        {reviewOfOrgansSenseOrgans && <Textarea
                            w='100%'
                            rows={5}
                            label="ORGANOS DE LOS SENTIDOS"
                            placeholder="Escriba la observacion aqui"
                            {...form.getInputProps('reviewOfOrgansSenseOrgans')} />}
                        {reviewOfOrgansBreath && <Textarea
                            w='100%'
                            rows={5}
                            label="RESPIRATORIO"
                            placeholder="Escriba la observacion aqui"
                            {...form.getInputProps('reviewOfOrgansBreath')} />}
                        {reviewOfOrgansCardiovascular && <Textarea
                            w='100%'
                            rows={5}
                            label="CADIO-VASCULAR"
                            placeholder="Escriba la observacion aqui"
                            {...form.getInputProps('reviewOfOrgansCardiovascular')} />}
                        {reviewOfOrgansDigestive && <Textarea
                            w='100%'
                            rows={5}
                            label="DIGESTIVO"
                            placeholder="Escriba la observacion aqui"
                            {...form.getInputProps('reviewOfOrgansDigestive')} />}
                        {reviewOfOrgansUrinary && <Textarea
                            w='100%'
                            rows={5}
                            label="GENITO - URINARIO"
                            placeholder="Escriba la observacion aqui"
                            {...form.getInputProps('reviewOfOrgansUrinary')} />}
                        {reviewOfOrgansSkeletalMuscle && <Textarea
                            w='100%'
                            rows={5}
                            label="MUSCULO ESQUELETICO"
                            placeholder="Escriba la observacion aqui"
                            {...form.getInputProps('reviewOfOrgansSkeletalMuscle')} />}
                        {reviewOfOrgansEndocrinic && <Textarea
                            w='100%'
                            rows={5}
                            label="ENDOCRINO"
                            placeholder="Escriba la observacion aqui"
                            {...form.getInputProps('reviewOfOrgansEndocrinic')} />}
                        {reviewOfOrgansHemoLymphatic && <Textarea
                            w='100%'
                            rows={5}
                            label="HEMO LINFATICO"
                            placeholder="Escriba la observacion aqui"
                            {...form.getInputProps('reviewOfOrgansHemoLymphatic')} />}
                        {reviewOfOrgansHighlyStrung && <Textarea
                            w='100%'
                            rows={5}
                            label="NERVIOSO"
                            placeholder="Escriba la observacion aqui"
                            {...form.getInputProps('reviewOfOrgansHighlyStrung')} />}
                    </Stack>
                </GridCol>
            </Grid>
        </form>
    )
});

ReviewOfOrgansAndSystemForm.displayName = 'ReviewOfOrgansAndSystemForm';

export default ReviewOfOrgansAndSystemForm