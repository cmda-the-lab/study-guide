# Components

This folder contains info on the different components that make up the Study Guide project of The Lab.

## Table of Contents

*   [Diagram](#diagram)
*   [Database](#database)
*   [API](#api)

## Diagram

The following ASCII-art diagram shows the different technical components.

```ascii
                                            +----------+
  +------------------------------------+    |          |
  |            TEACHERS APP            +----+          |
  | place where humans fill in courses |    |          |
  +------------------------------------+    |          |
                                            |          |    +----------+
  +------------------------------------+    |          |    |          |
  |            STUDENTS APP            +----+          +----+ database |
  |   place where humans view courses  |    |   API    |    |          |
  +------------------------------------+    |          |    +----------+
                                            |          |
  +------------------------------------+    |          |
  |            CUR. COM. APP           +----+          |
  | place where humans review courses  |    |          |
  +------------------------------------+    |          |
                                            +----------+
```

## Database

The interfaces in the database are described in [data-model](../data-model).

## API

The interface of the API is described in [api](../api).
