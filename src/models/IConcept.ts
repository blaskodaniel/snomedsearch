export interface IConcept {
    active: boolean,
    conceptId: string,
    definitionStatus: string,
    effectiveTime: string,
    fsn: Ifsn,
    id: string,
    moduleId: string,
    pt: Ipt
}

interface Ifsn {
    term: string,
    lang: string
}

interface Ipt {
    term: string,
    lang: string
}

export interface IMockConceptData extends IConcept{
    score: number,
    source: string
}