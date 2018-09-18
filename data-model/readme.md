# Data Model

This folder contains all the info on the conceptual data model of the Study Guide project The Lab.

[`index.ts`](index.ts) contains typescript definitions for the conceptual model, and all the interfaces used throughout the API.

Note that this model intentionally does not deal with:

*   Universities — for now, there’s just AUAS / HVA

Additionally, the following structures are limited:

*   People — for now, people are one big list, the model does not deal with people starting or ending work, or people working at multiple faculties
*   Programs — Could be modelled further, e.g., <https://studiegids.hva.nl/studiegids?edu=cmd-vt&acy=2018-2019>
*   Years — for now, competencies and courses exist, but they do not exist or change across years.
    New or changed ones get new identifiers
*   Languages — Maybe there’s a default language in a program
*   Objectives aren’t structured, maybe that’s fine, maybe not
*   Quarter and semester could be reflected from the start and end dates, maybe something else is needed though

Some more values need to be modelled:

*   [ ] `course.assessments` and `course.assessmentsSummary`
*   [ ] `course.materials` and `course.materialsSummary`
*   [ ] some form of prereqs and future courses, to relate to other courses in the program

The other directories contain a potential API structure, and examples of data as could be exposed from said API, implementing the typescript definitions.

## Table of Contents

*   [Nodes](#nodes)
    *   [Faculty](#faculty)
    *   [Program](#program)
    *   [Person](#person)
    *   [Competency](#competency)
    *   [Indicator](#indicator)
    *   [Course](#course)
*   [Abstract interfaces](#abstract-interfaces)
    *   [I18NLiteral](#i18nliteral)
    *   [I18NRoot](#i18nroot)

## Nodes

The following interfaces are exposed directly through the API.

### Faculty

A faculty is a group of programs in a university.

```typescript
export interface Faculty {
  id: string
  name: I18NLiteral[]
  programs?: Program[]
}
```

The `id` field is a unique identifier to distinguish one faculty from another across a university.

The `name` field is list of [I18NLiteral][]s.

Conceptually, there could be a `programs` field containing a list of [Program][]s exposed as well.

For example, a faculty could look like:

```json
{
  "id": "fdmci",
  "name": [
    {"language": "nl", "value": "Digitale Media en Creatieve Industrie"},
    {"language": "en", "value": "Digital Media and Creative Industry"}
  ]
}
```

### Program

A program is a group of courses required and elective, resulting in some piece of paper meaning a set of competencies have been attained.

```typescript
export interface Program {
  id: string
  name: I18NLiteral
  courses?: Course[]
  competencies?: Competencies[]
  faculty?: Faculty
}
```

The `id` field is a unique identifier to distinguish one program from another across a university.

The `name` field is list of [I18NLiteral][]s.

Conceptually, there could be a `courses` field containing a list of [Course][]s exposed as well.

Conceptually, there could be a `competencies` field containing a list of [Competencies][]s exposed as well.

Conceptually, there could be a `faculty` field containing a [Faculty][] exposed as well.

For example, a program could look like:

```json
{
  "id": "cmd-vt",
  "name": [
    {"language": "nl", "Communicatie en Multimedia Design"},
    {"language": "en", "Communcation and Multimedia Design"}
  ]
}
```

### Person

A person represents a human.
For now humans are simple, but they could be in some form of VCard / HCard in the future:

```typescript
export interface Person {
  id: string
  name: string
  email: string
}
```

The `id` field is a unique identifier to distinguish one person from another across a university.

The `name` field is name of a human, typically a given name and a family name.

The `email` field is a work email address to contact the person.

For example, a person could look like:

```json
{
  "id": "wormt",
  "name": "Titus Wormer",
  "email": "t.e.wormer@hva.nl"
}
```

### Competency

A competency represents a thing humans could attain.
For now, we’re only dealing with competencies as if they have always existed, will always exist, and will never change.

```typescript
export interface Competency {
  id: string
  name: I18NLiteral[]
  description: I18NRoot[]

  indicators?: Indicator[]
  program?: Program
}
```

The `id` field is a unique identifier to distinguish one competency from another across a program.

The `name` field is a list of [I18NLiteral][]s.

The `description` field is a list of [I18NRoot][]s.

Conceptually, there could be a `indicators` field containing a list of [Indicator][]s exposed as well.

Conceptually, there could be a `program` field containing a [Program][] exposed as well.

For example, a competency could look like:

```js
{
  "id": "4",
  "name": [
    {"language": "nl", "value": "Evalueren"},
    {"language": "en", "value": "Evaluation"}
  ],
  "description": [
    {
      "language": "nl",
      "content": {
        // ...
      }
    },
    {
      "language": "en",
      "content": {
        // ...
      }
    }
  ]
}
```

### Indicator

An indicator is something that proves part of a competency.

```typescript
export interface Indicator {
  id: string
  name: I18NLiteral[]
  description: I18NRoot[]

  indicators?: Indicator[]
  program?: Program
}
```

The `id` field is a unique identifier to distinguish one indicator from another across a program.

The `name` field is a list of [I18NLiteral][]s.

The `description` field is a list of [I18NRoot][]s.

Conceptually, there could be a `competency` field containing a [Competency][] that is proven by this indicator.

Conceptually, there could be a `program` field containing a [Program][] exposed as well.

For example, an indicator could look like:

```js
{
  "id": "4a",
  "name": [
    {"language": "nl", "value": "Een CMD’er is kritisch op het eigen werk met als doel dit te verbeteren en zoekt actief naar feedback."},
    {"language": "en", "value": "A CMD’er is self-critical to be able to improve their work and actively look for feedback."}
  ],
  "description": [
    {
      "language": "nl",
      "content": {
        // ...
      }
    },
    {
      "language": "en",
      "content": {
        // ...
      }
    }
  ]
}
```

### Course

A course is the main source of information.
The atoms in the university.

```typescript
export interface Course {
  id: string
  name: I18NLiteral[]
  description: I18NRoot[]
  year: string
  credits: number
  start: string
  end: string
  languages: string[]
  coordinators: Person[]
  coordinatorsSummary?: I18NRoot[]
  teachers: Person[]
  teachersSummary?: I18NRoot[]
  competencies: Competency[]
  competenciesSummary?: I18NRoot[]
  objectivesSummary: I18NRoot[]
  program?: Program
  faculty?: Faculty
}
```

The `id` field is a unique identifier to distinguish one course from another across a program.
This value is the same as the AUAS “Studiegidsnummer”, ASCII-lowercased.

The `name` field is a list of [I18NLiteral][]s.

The `description` field is a list of [I18NRoot][]s.

The `year` field is a school year identifier, in the form of `xxxy-xxxz`, where `z` is `y` incremented by one, and the X-es could be any year.  For example `2018-2019`.

The `credits` field is the number of points a students receives on completion of this course.
These are ECTS (European Credit Transfer and Accumulation System) as used in the Netherlands
(a year of studying is worth 60 points).
At CMDA, a course is typically 3 credits, whereas a project is 5.

The `languages` field is a list of BCP-47 tags, as relaxed as possible, defining the natural languages the course is given in.
Fluency in all languages in `languages` is required to attempt this course.
If a course was given in one or another language, it should be two courses instead.

The `start` and `end` fields are dates, as in `YYYY-MM-DD`, as in, a valid date string as defined by the HTML specification, and represent the date a course starts, and ends.
These values could reflect the quarter and semester a course is given in.
Potentially, coordinators don’t know these dates at the time of filling out information.
If a course is given to multiple groups starting in the same week, it’s said to be one course,
and the start date of the first group and the end date of the last group should be used.
If a course has start dates in multiple weeks, it is said to be different courses.

The `teachers` field contains a list of [Person][]s, teaching the course.

A `teachersSummary` field is an optional description of the people teaching the course, and is represented as [I18NRoot][]s.

The `coordinators` field contains a list of [Person][]s, coordinating the course.

A `coordinators` field is an optional description of the people coordinating the course, and is represented as [I18NRoot][]s.

The `competencies` field contains a list of [Competencies][].

A `competenciesSummary` field is an optional description of the competencies present in the course, and is represented as [I18NRoot][]s.

An `objectivesSummary` field is an optional description of the objectives attained in the course, and is represented as [I18NRoot][]s.

Conceptually, there could be a `program` field containing a [Program][] exposed as well.

Conceptually, there could be a `faculty` field containing a [Faculty][] exposed as well.

For example, an indicator could look like:

```js
{
  "id": "4a",
  "name": [
    {"language": "nl", "value": "Een CMD’er is kritisch op het eigen werk met als doel dit te verbeteren en zoekt actief naar feedback."},
    {"language": "en", "value": "A CMD’er is self-critical to be able to improve their work and actively look for feedback."}
  ],
  "description": [
    {
      "language": "nl",
      "content": {
        // ...
      }
    },
    {
      "language": "en",
      "content": {
        // ...
      }
    }
  ]
}
```

## Abstract interfaces

The following interfaces are used in concrete interfaces (those exposed through the API directly).

### I18NLiteral

A translatable literal is a textual value.

```typescript
export interface I18NLiteral {
  language: string
  value: string
}
```

The `language` field is a BCP-47 tag, as relaxed as possible, defining the natural language `value` is in.

The `value` field is a string representing the interface.

For example, a literal could look like:

```js
{"language": "nl", "value": "Digitale Media en Creatieve Industrie"},
```

### I18NRoot

A translatable root is any longform value.

```typescript
export interface I18NRoot {
  language: string
  content: HASTNode[]
}
```

The `language` field is a BCP-47 tag, as relaxed as possible, defining the natural language `content` is in.

The `content` field is a list of [HASTNode][]s.

For example, a root could look like:

```js
{
  "language": "nl",
  "content": [{
    "type": "element",
    "tagName": "p",
    "properties": {},
    "children": [
      {
        "type": "text",
        "value": "🏕 In Frontend Applications ("
      },
      {
        "type": "element",
        "tagName": "strong",
        "properties": {},
        "children": [{"type": "text", "value": "fa"}]
      },
      {
        "type": "text",
        "value": ") kijken we naar wat er nodig is om een frontend app te ontwikkelen. We combineren HTML en CSS kennis uit Frontend 1, JavaScript uit Frontend 2, en Node uit Backend. We ontdekken de tools die frontend designers in het werkveld gebruiken. Itereren, debuggen, en refactoren komen langs. Én we ontdekken frameworks."
      }
    ]
  }]
}
```

[faculty]: #faculty

[program]: #program

[course]: #course

[competencies]: #competency

[competency]: #competency

[indicator]: #indicator

[person]: #person

[i18nliteral]: #i18nliteral

[i18nroot]: #i18nroot

[hastnode]: https://github.com/syntax-tree/hast
