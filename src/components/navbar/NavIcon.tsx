<<<<<<< HEAD
import { IconNotebook, IconProps, Icon, IconUsers, IconWheelchair, IconStethoscope, IconLicense, IconVirus, IconReportMedical, IconMapPin, IconKey, IconCode, IconBuildingCommunity, IconClipboardData, IconBriefcase2, IconTestPipe2, IconCloudDownload, IconIdBadge2 } from "@tabler/icons-react";
=======
import { IconProps, Icon, IconUsers, IconWheelchair, IconStethoscope, IconLicense, IconVirus, IconReportMedical, IconMapPin, IconKey, IconCode, IconBuildingCommunity, IconClipboardData, IconBriefcase2, IconTestPipe2 } from "@tabler/icons-react";
>>>>>>> main
import { ForwardRefExoticComponent, RefAttributes } from "react";

export const NavIcon: Record<string, ForwardRefExoticComponent<Omit<IconProps, "ref"> & RefAttributes<Icon>>> = {
    "user": IconUsers,
    "patient": IconWheelchair,
    "doctor": IconStethoscope,
    "role": IconLicense,
    "morbidity": IconVirus,
    "report": IconReportMedical,
    "location": IconMapPin,
    "key": IconKey,
    "code": IconCode,
    "building": IconBuildingCommunity,
    "order": IconClipboardData,
    "briefcase": IconBriefcase2,
    "test-pipe": IconTestPipe2,
    "clipboard-data": IconClipboardData,
<<<<<<< HEAD
    "cloud-download": IconCloudDownload,
    "id-badge": IconIdBadge2,
    "note-book": IconNotebook,
=======
>>>>>>> main
}