// You can freely edit/extend this file. Each set is an array of questions.
// answerIndex is zero-based and must match the options array.

window.QUIZ_SETS = {
  easy: [
    {
      q: "You want to ensure that a class has only one instance and provide a global point of access to it.",
      options: ["Factory Method","Singleton","Prototype","Builder"],
      answerIndex: 1
    },
    {
      q: "You want to build a complex object step-by-step and the construction process should allow different representations.",
      options: ["Abstract Factory","Builder","Singleton","Command"],
      answerIndex: 1
    },
    {
      q: "You want to create objects without specifying the exact class of object that will be created.",
      options: ["Factory Method","Adapter","Observer","Strategy"],
      answerIndex: 0
    },
    {
      q: "You need to reuse existing objects and clone them rather than creating new instances.",
      options: ["Decorator","Prototype","Builder","Mediator"],
      answerIndex: 1
    },
    {
      q: "An object needs to notify other dependent objects automatically when its state changes.",
      options: ["Observer","Iterator","Command","Mediator"],
      answerIndex: 0
    },
    {
      q: "A user clicks an “Undo” button and the application should reverse the previous operation.",
      options: ["Strategy","Command","Template","Interpreter"],
      answerIndex: 1
    },
    {
      q: "You want to decouple an algorithm from the context and allow switching the algorithm at runtime.",
      options: ["Factory","Template","Strategy","Visitor"],
      answerIndex: 2
    },
    {
      q: "You have a group of similar objects and you want to iterate over them without exposing the underlying representation.",
      options: ["Iterator","Visitor","Adapter","Observer"],
      answerIndex: 0
    },
    {
      q: "You want to define the skeleton of an algorithm but allow subclasses to redefine certain steps.",
      options: ["Strategy","Template Method","Command","Chain of Responsibility"],
      answerIndex: 1
    },
    {
      q: "You want to dynamically add responsibilities to objects without modifying their code.",
      options: ["Adapter","Decorator","Prototype","Singleton"],
      answerIndex: 1
    }
  ],
  medium: [
    {
      q: "A GUI button should encapsulate an action and its parameters so it can be executed later.",
      options: ["Strategy","Visitor","Command","Proxy"],
      answerIndex: 2
    },
    {
      q: "Separate the creation of families of related objects without specifying their concrete classes.",
      options: ["Factory Method","Abstract Factory","Builder","Adapter"],
      answerIndex: 1
    },
    {
      q: "Make objects communicate via a central hub instead of directly referencing each other.",
      options: ["Observer","Mediator","Chain of Responsibility","Template"],
      answerIndex: 1
    },
    {
      q: "Provide a surrogate or placeholder to control access to another object.",
      options: ["Proxy","Bridge","Flyweight","Facade"],
      answerIndex: 0
    },
    {
      q: "Traverse a composite structure (like a document/tree) and perform operations without changing structure classes.",
      options: ["Visitor","Template","Interpreter","Command"],
      answerIndex: 0
    },
    {
      q: "Reduce memory by sharing intrinsic state among many fine-grained objects.",
      options: ["Prototype","Decorator","Flyweight","Adapter"],
      answerIndex: 2
    },
    {
      q: "Process a request through a sequence of handlers until one handles it.",
      options: ["Strategy","Mediator","Chain of Responsibility","Observer"],
      answerIndex: 2
    },
    {
      q: "Wrap an object to match a different interface, without changing the original object.",
      options: ["Adapter","Facade","Proxy","Visitor"],
      answerIndex: 0
    },
    {
      q: "Define a language grammar and interpret sentences in that language.",
      options: ["Interpreter","Template","Strategy","Observer"],
      answerIndex: 0
    },
    {
      q: "Provide a unified interface to a set of interfaces in a subsystem.",
      options: ["Adapter","Bridge","Facade","Proxy"],
      answerIndex: 2
    }
  ],
  hard: [
    {
      q: "Construct different types of documents (PDF, HTML, DOCX) using the same construction process.",
      options: ["Factory Method","Abstract Factory","Builder","Prototype"],
      answerIndex: 2
    },
    {
      q: "Control how/when objects are created to enforce resource limits in a multi-threaded system.",
      options: ["Singleton","Flyweight","Factory Method","Object Pool"],
      answerIndex: 3
    },
    {
      q: "Traverse different container types using the same algorithm without modifying implementation.",
      options: ["Template Method","Visitor","Iterator","Composite"],
      answerIndex: 2
    },
    {
      q: "An object should change its behavior when its internal state changes.",
      options: ["Strategy","Observer","State","Command"],
      answerIndex: 2
    },
    {
      q: "Allow a request to be undone or logged for audit and possibly queued for later execution.",
      options: ["Strategy","Command","Template Method","Mediator"],
      answerIndex: 1
    },
    {
      q: "Reduce duplication/tight coupling caused by inheritance by delegating behavior to interchangeable components.",
      options: ["Chain of Responsibility","Strategy","Template","Mediator"],
      answerIndex: 1
    },
    {
      q: "Simplify the creation of complex tree structures and treat individual objects and groups uniformly.",
      options: ["Composite","Visitor","Interpreter","Prototype"],
      answerIndex: 0
    },
    {
      q: "Apply an operation across a structure of objects without changing their classes.",
      options: ["Command","Visitor","Observer","Proxy"],
      answerIndex: 1
    },
    {
      q: "Provide alternate implementations of the same abstraction based on runtime configuration.",
      options: ["Decorator","Proxy","Strategy","Bridge"],
      answerIndex: 3
    },
    {
      q: "Decouple abstraction from its implementation so the two can vary independently.",
      options: ["Adapter","Bridge","Decorator","Facade"],
      answerIndex: 1
    }
  ]
};
