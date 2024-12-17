import {Role} from "./Role";
import {School} from "./School";
import {Base, BaseType} from "./Base";
import {resourceMappingClothe} from "@/components/Account/EditCharacterBlock/CharacterPart/ressourceMappingClothe";
import {resourceMappingHead} from "@/components/Account/EditCharacterBlock/CharacterPart/ressourceMappingHead";
import {resourceMappingEyebrows} from "@/components/Account/EditCharacterBlock/CharacterPart/ressourceMappingEyebrows";
import {resourceMappingEarings} from "@/components/Account/EditCharacterBlock/CharacterPart/ressourceMappingEarings";
import {resourceMappingGlass} from "@/components/Account/EditCharacterBlock/CharacterPart/ressourceMappingGlass";
import {resourceMappingNecklace} from "@/components/Account/EditCharacterBlock/CharacterPart/ressourceMappingNecklace";
import {resourceMappingHair} from "@/components/Account/EditCharacterBlock/CharacterPart/ressourceMappingHair";
import {resourceMappingSkin} from "@/components/Account/EditCharacterBlock/CharacterPart/ressourceMappingSkin";
import {Music} from "@/hooks/API/ObjectTypes/Music";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const API_URL = `${BASE_URL}api/`;

export interface UserType extends BaseType {
    avatar: {
        hair: keyof typeof resourceMappingHair;
        head: keyof typeof resourceMappingHead;
        eyebrows: keyof typeof resourceMappingEyebrows;
        earings: keyof typeof resourceMappingEarings;
        glass: keyof typeof resourceMappingGlass;
        necklace: keyof typeof resourceMappingNecklace;
        clothe: keyof typeof resourceMappingClothe;
        skin: keyof typeof resourceMappingSkin;
        polarText: string;
    };
    email: string;
    firstname: string;
    gender: number;
    lastname: string;
    params: object;
    birthday: string;
    roles: Array<Role> | Array<string>;
    school: School | string;
    music: Music | null;
    schoolYear: number;
    tel: string;
    tShirtSize: string;
    computerPorts: Array<string>;
    isValid: boolean;
    credits: number;
}

export interface UserParamsType {
    params: {
        notifications: {
            participation_event: boolean;
            schedule_event: boolean;
            new_event: boolean;
            ranking: boolean;
            goal: boolean;
        };
    };
}

export interface AvatarType {
    head: string;
}

export class User extends Base {
    // PROPERTIES
    email: string | undefined;
    firstname: string | undefined;
    lastname: string | undefined;
    tel: string | undefined;
    roles: Role[] | string[] | undefined;
    school: School | string | undefined;
    schoolYear: number;
    birthday: Date;
    gender: number;
    params: UserParamsType | object;
    avatar: AvatarType | object;
    music: Music | null;
    tShirtSize: string;
    computerPorts: string[];
    isValid: boolean | undefined;
    credits: number;

    constructor(parameters?: UserType) {
        super(parameters!);
        const {
            email,
            firstname,
            lastname,
            tel,
            roles,
            school,
            birthday,
            gender,
            schoolYear,
            params,
            avatar,
            tShirtSize,
            computerPorts,
            isValid,
            music,
            credits
        } = parameters ?? {};
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.tel = tel;
        this.roles = roles;
        this.school = school;
        this.gender = gender ?? 1;
        this.birthday = birthday ? new Date(birthday) : new Date();
        this.schoolYear = schoolYear ?? 1;
        this.params = params ?? {};
        this.avatar = avatar ?? {};
        this.isValid = isValid ?? false;
        this.tShirtSize = tShirtSize || "";
        this.computerPorts = computerPorts || [];
        this.music = music ?? null;
        this.credits = credits ?? 0;
    }

    get avatarUri(): string {
        return API_URL + "avatars/" + this._id;
    }
}
