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
  name: string

  // List of applicable programs.
  programs: Program[]
}

// A complete program.
export interface Program {
  // Program. The unique id for the course is currently present in studyguide URLs,
  // e.g., `cmd-vt`.
  // And a human-readable name of the course, e.g., `Communication and Multimedia Design (bachelor, voltijd)`.
  // Potentially, we could have a name, type (bachelor, master), and fulltime (true, false).
  id: string
  name: string

  // List of applicable courses.
  courses: Course[]

  // List of competencies.
  competencies: Competencies[]

  // Faculty should be calculated from the id.
  facultyId: string
  faculty?: Faculty
}

// An atom in a university module.
export interface Course {
  // Course. The unique id for the course, e.g., `3000FRAP18`, this is a
  // catalogue number.
  // And a human-readable name of the course, e.g., `Frontend Applications`.
  id: string
  name: string

  // A field describing the course. Should be one paragraph, per language.
  description: Field[]

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
  language: string[]

  // List of methods, e.g., `lecture`, `lab`. Could be a list of Method interfaces.
  methods: string[]
  methodSummary?: Field[]

  // List of people.
  coordinators: Person[]
  coordinatorsSummary?: Field[]

  // List of people.
  teachers: Person[]
  teachersSummary?: Field[]

  // List of learning objectives.  Free form to be filled out be coordinator.
  objectives: Objective[]
  objectivesSummary?: Field[]

  // List of competencies.  Choice from program mix.
  competencies: Competency[]
  competenciesSummary?: Field[]
  
  // To do:
  // - add materials
  // - add assessments
  // - add extra notes / remarks
  // - Add automated relation to other courses, based on them requiring this or
  // suggesting this, or the other way around?

  // Faculty and program should be calculated from the id.
  programId: string
  program?: string
  facultyId: string
  faculty?: string
}

export interface Person {
  id: string

  // Name of a person, e.g., `Titus Wormer` or `Titus E.C. Wormer`
  name: string

  // The work email of the person.
  email: string
}

export interface Field {
  // The language of a field, in BCP-47 format.
  language: string

  // The content of a field, <https://github.com/syntax-tree/hast> format.
  content: HastNode
}

// To do
export interface Objective {
}

// To do
export interface Competency {
}
