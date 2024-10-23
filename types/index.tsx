import type React from "react";
import {type BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import {type CompositeScreenProps, type NavigatorScreenParams, type RouteProp,} from "@react-navigation/native";
import {type ParamListBase} from "@react-navigation/routers";
import {type NativeStackScreenProps} from "@react-navigation/native-stack";
import {type resourceMappingClothe} from "@/components/Account/EditCharacterBlock/CharacterPart/ressourceMappingClothe";
import {
    type resourceMappingNecklace
} from "@/components/Account/EditCharacterBlock/CharacterPart/ressourceMappingNecklace";
import {type resourceMappingGlass} from "@/components/Account/EditCharacterBlock/CharacterPart/ressourceMappingGlass";
import {
    type resourceMappingEarings
} from "@/components/Account/EditCharacterBlock/CharacterPart/ressourceMappingEarings";
import {
    type resourceMappingEyebrows
} from "@/components/Account/EditCharacterBlock/CharacterPart/ressourceMappingEyebrows";
import {type resourceMappingHead} from "@/components/Account/EditCharacterBlock/CharacterPart/ressourceMappingHead";
import {type resourceMappingHair} from "@/components/Account/EditCharacterBlock/CharacterPart/ressourceMappingHair";
import {type resourceMappingSkin} from "@/components/Account/EditCharacterBlock/CharacterPart/ressourceMappingSkin";
import {type resourceMappingTeeth} from "@/components/Account/EditCharacterBlock/CharacterPart/ressourceMappingTeeth";
import {type resourceMappingTongue} from "@/components/Account/EditCharacterBlock/CharacterPart/ressourceMappingTongue";
import type {Notification} from "@/hooks/API/ObjectTypes/Notification";
import {SvgProps} from "react-native-svg";
import {ArchivePost} from "@/hooks/API/ObjectTypes/ArchivePost";
import {Music} from "@/hooks/API/ObjectTypes/Music";
import {AVPlaybackSource} from "expo-av";

export type ContentType =
    | "confidentialityPolicy"
    | "thermOfUsePolicy"
    | "legalMentionPolicy"
    | "EuropeanReglementationPolicy";

export interface field {
    _id: string;
    name: string;
    required: boolean;
    defaultValue: string;
    label: string;
    placeholder: string;
    validation: string;
    fieldType: string;
    choices: string;
    options?: Array<{ label: string; value: string }>;
    objectTypeId: string;
}

export interface hubspotData {
    submittedAt: number;
    fields: Array<{ objectTypeId: string; name: string; value: string }>;
    legalConsentOptions: any;
}

export interface hubspotField {
    name: string;
    label: string;
    type: string;
    fieldType: string;
    description: string;
    groupName: string;
    displayOrder: number;
    required: boolean;
    selectedOptions: Array<{ label: string; value: string }>;
    options: Array<{ label: string; value: string }>;
    validation: {
        name: string;
        message: string;
        data: string;
        useDefaultBlockList: false;
        blockedEmailAddresses: string[];
    };
    enabled: true;
    hidden: false;
    defaultValue: string;
    isSmartField: boolean;
    unselectedLabel: string;
    placeholder: string;
    dependentFieldFilters: hubspotField[];
    labelHidden: boolean;
    propertyObjectType: string;
    metaData: any[];
    objectTypeId: string;
}

export interface RootTabParamList extends ParamListBase {
    LogIn: { hasLoggedOut: boolean } | undefined;
    Accueil: undefined;
    Root: undefined;
    Formulaires: undefined;
    // FillForm: { idForm: string; fields: hubspotField[] };
    AccountScreen: undefined;
    CalendarScreen:
        | {
        notification_event_id?: string;
    }
        | undefined;
    Compte: undefined;
    ParametersScreen: undefined;
    AboutScreen: undefined;
    ForgotPassword: undefined;
    LogOut: { isLoggedOut: boolean } | undefined;
    OnBoard: undefined;
    FirstLogStep1: undefined;
    FirstLogStep2: undefined;
    FirstLogStep3: undefined;
    FirstLogStep4: undefined;
    FirstLogStep5: undefined;
    NotificationTemplate: {
        notification: Notification;
        onDelete: any;
    };
    Calendrier:
        | {
        notification_event_id?: string;
    }
        | undefined;
    EventViewer: {
        archiveId: string;
    };
}

export interface RootStackParamList extends ParamListBase {
    Accueil: undefined;
    Root: NavigatorScreenParams<RootTabParamList> | undefined;
    Modal: undefined;
    NotFound: undefined;
    FillForm:
        | {
        name: string | undefined;
        idForm: number | string | undefined;
        fields: field[] | null;
    }
        | undefined;
    LogIn: { hasLoggedOut: boolean } | undefined;
    UserEditScreen: undefined;
    Calendrier:
        | {
        notification_event_id?: string;
    }
        | undefined;
    CharacterEditScreen: undefined;
    NotificationScreen: undefined;
    SecurityScreen: undefined;
    HelpScreen: undefined;
    ContentPolicyScreen: { contentType: ContentType } | undefined;
    ModalNotificationScreen: undefined;
    NotificationTemplate: {
        notification: Notification;
        onDelete: any;
    };
    ModalLeaderboardScreen: undefined;
    AboutScreen: undefined;
    ParametersScreen: undefined;
    ForgotPassword: undefined;
    LogOut: { isLoggedOut: boolean } | undefined;
    OnBoard: undefined;
    FirstLogStep1: undefined;
    FirstLogStep2: undefined;
    FirstLogStep3: undefined;
    FirstLogStep4: undefined;
    FirstLogStep5: undefined;
    EventViewer: {
        archiveId: string;
    };
    Story: {
        stories: ArchivePost[];
        currentStoryIndex: number;
    };
}

export interface RootParamList extends RootStackParamList {
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabScreenProps<Screen extends string> = CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
>;

export type ContentPolicyScreenRouteProp = RouteProp<
    RootStackParamList,
    "ContentPolicyScreen"
> & {
    params: {
        contentType: string;
    };
};

export interface routeProps {
    route: ContentPolicyScreenRouteProp;
}

export interface ContentItem {
    id: number;
    name: string;
    contentType: ContentType;
}

export interface Props extends RootTabScreenProps<"AboutScreen"> {
}

export interface ColorsPalette {
    primary: string;
    secondary: string;

    [key: string]: string;
}

export interface SchoolIconColors {
    primaryColor: string;
    secondaryColor: string;
}

export interface School {
    name: string;
    colors: ColorsPalette;
    id: string;
}

export interface AmbassadorData {
    email: string;
    firstname: string;
    id: string;
    lastname: string;
    school: School;
    stats: Record<string, unknown>;
    tel: string;
    genre: string;
}

export interface UserStatistics {
    next_events: number | null;
    nb_events: number | null;
    nb_forms: number | null;
    level: number | null;
}

export interface ListSchool {
    "WebTech Institute": "";
    "ATLAS Institute": "";
    "Bachelor Institute": "";
    ESCEN: "";
    "Magnum Institute": "";
    "NEXT-U": "";
}

export interface SchoolState {
    _id: string;
    name: keyof ListSchool | null;
    colors: {
        primary: string;
        secondary: string;
    };
}

export interface UserState {
    birthday: Date;
    params: any;
    _id: string | null;
    id?: string | null;
    email: string | null;
    avatar: {
        hair: keyof typeof resourceMappingHair;
        head: keyof typeof resourceMappingHead;
        eyebrows: keyof typeof resourceMappingEyebrows;
        earings: keyof typeof resourceMappingEarings;
        glass: keyof typeof resourceMappingGlass;
        necklace: keyof typeof resourceMappingNecklace;
        clothe: keyof typeof resourceMappingClothe;
        skin: keyof typeof resourceMappingSkin;
        teeth: keyof typeof resourceMappingTeeth;
        tongue: keyof typeof resourceMappingTongue;
        polarText: string;
    };
    firstname: string | null;
    lastname: string | null;
    tel: string | null;
    genre: string | null;
    school: SchoolState;
    roles: SchoolState[];
    stats: UserStatistics | null;
    schoolYear: number | null;
    tShirtSize: string | null;
    computerPorts: string[] | null;
    isValid: boolean | null;
    hasAvatarChanged: boolean;
    gender: number;
    music: Music | null;
    accessToken: string | null;
    refreshToken: string | null;
    permanentToken: string | null;
}

export interface Category {
    id?: number;
    name: string;
    number: number | string;
    key?: number;
    background?: string;
}

export interface event {
    _id: string;
    address: string;
    ambassadors: object[];
    end_date: Date;
    name: string;
    start_date: Date;
}

export interface form {
    _id: string;
    name: string;
    evenement: event;
    hubspot_form: {
        guid: string;
        formFieldGroups: Array<{ fields: field[] }>;
    };
    school: School;
}

export interface NotificationData {
    id: string | null;
    type: string;
    subtype: string | null;
    idEvent?: string | null;
    nameEvent?: string;
    dateEvent?: string;
    startHourEvent?: string;
    endHourEvent?: string;
    levelAmbassador?: string;
    levelPodium?: string;
    stepForm?: string;
    timestamp?: Date | string;
}

export interface PasswordData {
    oldPassword: string;
    newPassword: string;
    verifyPassword: string;
    showOldPassword?: boolean;
    showNewPassword?: boolean;
    showVerifyPassword?: boolean;
}

export interface ErrorPasswordData {
    oldPassword: string;
    newPassword: string;
    verifyPassword: string;
}

export interface HelpData {
    subject: string;
    messageType: string;
    message: string;
}

export interface itemNavigation {
    id: number;
    name: string;
    url: string;
    category?: string;
    nameIcon?:
        | "EditIcon"
        | "LockIcon"
        | "BellIcon"
        | "BubbleIcon"
        | "AboutIcon"
        | "LogoutIcon";
}

export type elementCategory = Record<string, itemNavigation[]>;

export interface InputData {
    value: string;
    placeholder: string;
    onChangeText?: (text: string) => void;
    secureTextEntry: boolean;
    showPassword?: boolean;
    switchPasswordVisibility?: () => void;
    multiline: boolean;
    numberOfLines?: 1 | number;
    regex?: RegExp[] | RegExp;
    isInValid?: boolean;
    setIsInValid?: (newValue: boolean) => void;
    hasToBeChecked?: boolean;
    editable?: boolean;
    isVerify?: boolean;
    searchInput?: boolean;
}

export interface DateTimePickerType {
    date: Date | string;
    setDate: (newVal: Date) => void;
}

export interface DropDownData<T> {
    modalTitle: string;
    placeholder: string;
    open: boolean;
    value: T | null;
    items: Array<{ value: number | string; label: string }>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setValue: React.Dispatch<React.SetStateAction<T>>;
    isValid?: boolean;
    setIsValid?: (newValue: string | number | boolean) => void;
    translation?: Record<string, string>;
    multiple?: boolean;
    isModal?: boolean;
}

export interface LabelData {
    name: string;
    required: boolean;
    isDefault?: boolean;
}

export interface Fields {
    pcPortsIsValid: string | boolean | undefined;
    tshirtSizeIsValid: string | boolean | undefined;
    genderIsValid: string | boolean | undefined;
    pcPorts: string | undefined;
    tshirtSize: string | undefined;
    birthday: string | undefined;
    gender: string | undefined;
    firstname?: string;
    lastname?: string;
    email?: string;
    tel?: string;
    school?: string;
    firstnameIsValid?: boolean;
    lastnameIsValid?: boolean;
    emailIsValid?: boolean;
    telIsValid?: boolean;
    schoolIsValid?: boolean;
    newPassword?: string;
    oldPassword?: string;
    verifyPassword?: string;
    newPasswordIsValid?: boolean;
    verifyPasswordIsValid?: boolean;
    subject?: string;
    messageType?: string;
    message?: string;
    subjectIsValid?: boolean;
    messageTypeIsValid?: boolean;
    messageIsValid?: boolean;
}

export interface ButtonData {
    isFormValid: boolean;
    handleSubmit: () => void;
}

export interface Modaltype {
    open: boolean;
    onClose: () => void;
    data: {
        event_id: string;
        rdv_hour: Date;
        debut_hour: Date;
        end_hour: Date;
        title: string;
        description: string;
        localisation: string;
        rdv_localisation: string;
        actual_seat: number;
        max_seat: number;
        credits: number;
        participationStatus: string[];
        represented_school: string[];
    };
    hourOptions: {
        hour: "numeric" | "2-digit" | undefined;
        minute: "numeric" | "2-digit" | undefined;
        hour12: boolean;
    };
}

export interface weekProps {
    weekView?: boolean;
    params: any;
}

export interface dropDownPickerOption {
    label: string;
    value: string;
}

export interface pushToken {
    token: string | null;
}

export interface fileItem {
    name: string;
}

export interface ArticleSubtitleData {
    title: string | React.ReactNode;
    content: string | React.ReactNode;
}

export interface ArticlePolicyData extends ArticleSubtitleData {
    subtitles?: ArticleSubtitleData[];
    url?: string;
}

// prettier-ignore
export interface LogoSchools {
    "WebTech Institute": string;
    "ATLAS Institute": string;
    "Magnum Institute": string;
    "Bachelor Institute": string;
    "ESCEN": string;
    "NEXT-U": string;
}

export interface StampWidgetData {
    logo: keyof LogoSchools;
    schoolYear: number | string;
}

export interface PointsData {
    maxPoints: number;
    actualPoints: number;
}

export interface CardInfo {
    id: string;
    text: string;
    icon: string;
}

export interface ModalWidgetData<cardInfo extends CardInfo | null>
    extends PointsData {
    isVisible: boolean;
    onClose: () => void;
    cardInfo: cardInfo | null;
}

export interface AnimatedSensor {
    sensor: {
        value: {
            x: number;
            y: number;
        };
    };
}

export interface AmbassadorStatsBlockData {
    eventDone: number;
    formSend: number;
    level: number;
    nextEvent: number;
}

export interface FirstLogStep {
    description: string;
    descriptionOut?: string;
    picture: string;
    picture2?: string;
    page:
        | "/(app)/(tabs)/home"
        | "/(app)/first-login/step-2"
        | "/(app)/first-login/step-3"
        | "/(app)/first-login/step-4"
        | "/(app)/first-login/step-5";
}

export interface ProgressButtonProps {
    percentage: number;
    navigateTo: () => void;
    style?: any;
    timer?: boolean;
    onPressOut?: () => void;
}

export interface switchEventInterfce {
    title: string;
    icon: React.JSX.Element;
    message: string;
}

export interface formFieldCast {
    hidden: boolean;
    name: string;
    type: string;
    label: string;
    isRequired: boolean;
    placeholder: string;
    defaultValue: string;
    options: Array<{ label: string; value: string }>;
    objectTypeId: string;
}

export interface MusicBackgroundProps {
    mainColor?: string;
    secondColor?: string;
    thirdColor?: string;
    fourthColor?: string;
    style?: React.CSSProperties;
}

export interface PortIconProps {
    isActive: boolean;
    portColor: string;
}

export interface IconProps {
    color?: string;
    size?: number;
    isStarred?: boolean;
    style?: React.CSSProperties;
}

export interface AudioControllerProp {
    mp3File: AVPlaybackSource | string;
    musicTitle: string;
    musicSubtitle: string;
    musicTheme: string;
    musicTag: string;
    onPlayPause: any;
    onNext: any;
    onPrevious: any;
    isToggleAnimating: boolean;
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
}

export interface SvgCustomProps extends SvgProps {
    fillColor?: string;
}
