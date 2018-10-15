// Hi!  This here is a model for study guide information.
// For one example, it’s modelled after:
// <https://studiegids.hva.nl/studiegids?edu=cmd-vt&phase=Leerjaar%203&path=https%3A%2F%2Fmetadata-fdmci.mijnhva.nl%2FLists%2FDraftMetadata%2FDispForm.aspx%3FID%3D5119>
// (I know, horrible website).
// This is based on:
// <https://github.com/cmda-the-lab/study-guide/blob/95e5056/data_model_concept.json>

export as namespace StudyGuide

// A complete faculty.
export interface Faculty {
  // E.G., `fdmci` and `Digitale Media en Creatieve Industrie`.
  id: string
  name: I18NLiteral

  // Applicable programs.
  programs?: Program[]
}

// A complete program.
export interface Program {
  // Program. The unique id for the course is currently present in studyguide URLs,
  // e.g., `cmd-vt`.
  // And a human-readable name of the course, e.g., `Communication and Multimedia Design (bachelor, voltijd)`.
  // Potentially, we could have a name, type (bachelor, master), and fulltime (true, false).
  id: string
  name: I18NLiteral

  // CROHO Code:
  // See <https://duo.nl/zakelijk/hoger-onderwijs/studentenadministratie/croho.jsp>
  code: string
  // Type of program (e.g., bachelor)
  degree: string
  // Total credits for program
  credits: number

  // Applicable courses and competencies.
  courses?: Course[]
  competencies?: Competencies[]

  // Faculty the program is part of.
  faculty?: Faculty
}

export interface Competency {
  id: string
  name: I18NLiteral[]
  description: I18NRoot[]

  indicators?: Indicator[]
  program?: Program
}

export interface Indicator {
  id: string
  name: I18NLiteral[]
  description: I18NRoot[]

  competency?: Competency
  program?: Program
}

// An atom in a university module.
export interface Course {
  // Course. The unique id for the course, e.g., `3000FRAP18`, this is a
  // catalogue number.
  // And a human-readable name of the course, e.g., `Frontend Applications`.
  id: string
  name: string

  // A field describing the course. Should be one paragraph, per language.
  description: I18NRoot[]

  // The (school) year of the course, e.g., `2018-2019`.
  year: string

  // ECTS (European Credit Transfer and Accumulation System) as used in the
  // Netherlands (a year of studying is typically worth 60 points).
  // At CMDA, a course is typically 3 credits, whereas a project is 5.
  credits: number

  // Date the course starts and ends, e.g., `2018-10-08` and `2018-10-19`,
  // Quarters and Semesters are calculated from this.
  start: string
  end: string

  // Languages the course is given in. BCP-47 tags.
  languages: string[]

  // List of methods, e.g., `lecture`, `lab`. Could be a list of Method interfaces.
  methods: string[]
  methodSummary?: I18NRoot[]

  // List of people.
  coordinators: Person[]
  coordinatorsSummary?: I18NRoot[]

  // List of people.
  teachers: Person[]
  teachersSummary?: I18NRoot[]

  // List of competencies.  Choice from program mix.
  // Maybe these are indicators instead?
  competencies: Competency[]
  competenciesSummary?: I18NRoot[]
  
  // List of translated learning objectives, probably lists.
  // Free form to be filled out be coordinator.
  objectivesSummary?: I18NRoot[]

  program?: Program
  faculty?: Faculty
}

export interface Person {
  id: string

  // Name of a person, e.g., `Titus Wormer`.
  name: string

  // The work email of the person.
  email: string
}

export interface I18NLiteral {
  // The language of a field, in BCP-47 format.
  language: string

  // The content of a field
  value: string
}

export interface I18NRoot {
  // The language of a field, in BCP-47 format.
  language: string

  // The content of a field, must be any node acceptable in a `<body>` element,
  // See <https://github.com/syntax-tree/hast>.
  content: HASTNode[]
}
