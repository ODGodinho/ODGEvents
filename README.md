<h1 align="center">
    <a href="https://github.com/ODGodinho">
        <img
            src="https://raw.githubusercontent.com/ODGodinho/Stanley-TheTemplate/main/public/images/Stanley.jpg"
            alt="Stanley Imagem" width="500"
        />
    </a>
    <br />
    Stanley The Template For Typescript By Dragons Gamers
    <br />
</h1>

<h4 align="center">Template Stanley for Typescript projects and packages 📦!</h4>

<p align="center">

[![codecov](https://codecov.io/gh/ODGodinho/ODGEvents/branch/main/graph/badge.svg?token=HNBNLLPZ3J)](https://codecov.io/gh/ODGodinho/ODGEvents)
[![Stargazers](https://img.shields.io/github/stars/ODGodinho/ODGEvents?color=F430A4)](https://github.com/ODGodinho/ODGEvents/stargazers)
[![Made by ODGodinho](https://img.shields.io/badge/made%20by-ODGodinho-%2304A361)](https://www.linkedin.com/in/victor-alves-odgodinho/)
[![Forks](https://img.shields.io/github/forks/ODGodinho/ODGEvents?color=CD4D34)](https://github.com/ODGodinho/ODGEvents/network/members)
![Repository size](https://img.shields.io/github/repo-size/ODGodinho/ODGEvents)
[![GitHub last commit](https://img.shields.io/github/last-commit/ODGodinho/ODGEvents)](https://github.com/ODGodinho/ODGEvents/commits/master)
[![License](https://img.shields.io/badge/license-MIT-brightgreen)](https://opensource.org/licenses/MIT)
[![StyleCI](https://github.styleci.io/repos/581704353/shield?branch=main)](https://github.styleci.io/repos/581704353?branch=main)

</p>

# Table of Contents

- [🎇 Benefits](#-benefits)
- [📗 Libraries](#-libraries)
- [📁 Dependencies](#-dependencies)
- [⏩ Get Started](#-get-started)
  - [🔘 Use Event Interface](#-use-event-interface)
  - [📰 Usage](#-usage)
  - [🌎 Implementation](#-implementation)
  - [🌎 Ioc](#-ioc)
  - [🏓 Use Event Provider](#-use-event-provider)
    - [🚡 Enum Events Types](#-enum-events-types)
    - [🥮 Make a provider](#-make-a-provider)
    - [🦻 Use Event Listeners](#-use-event-listeners)
  - [💻 Prepare to develop](#-prepare-to-develop)
  - [📍 Start Project](#-start-project)
  - [📨 Build and Run](#-build-and-run)
  - [🧪 Teste Code](#-teste-code)

---

## 🎇 Benefits

- 🚀 Event Pattern for your project
- 🚨 Over 800 rules for pattern, possible errors and errors in Linter
- 🎇 Code quality guaranteed
- 📢 Ioc Container
- 🧪 100% Test Coverage

## 📗 Libraries

- [Node.js 16](https://nodejs.org/?n=dragonsgamers)
- [Typescript](https://www.typescriptlang.org/?n=dragonsgamers)
- [Eslint](https://eslint.org/?n=dragonsgamers)
- [ODG-Linter-JS](https://github.com/ODGodinho/ODG-Linter-Js?n=dragonsgamers)
- [EditorConfig](https://editorconfig.org/?n=dragonsgamers)
- [ReviewDog](https://github.com/reviewdog/action-eslint)

## 📁 Dependencies

- [Node.js](https://nodejs.org) 16 or later
- [Yarn](https://yarnpkg.com/) Optional/Recommended
- [ODG TsConfig](https://github.com/ODGodinho/tsconfig) Last Version

## ⏩ Get Started

---

### 🔘 Use Event Interface

Install in your project using this command

```powershell
yarn add @odg/events
```

### 📰 Usage

#### 🌎 Implementation

```typescript
interface EventType {
    "event1": number, // receive number
    "userRegister": {
        name: string,
        age: number
    } // receive object,
}

const eventBus = new EventEmitterBus<EventType>();
const callback = (eventMessage: string) => {
    console.log(eventMessage);
};

eventBus.subscribe("event1", callback); // Subscribe before dispatch
eventBus.dispatch("event1", 1); // Send 1 to event1
eventBus.dispatch("userRegister", { name: "ODGodinho", age: 18 }); // Send object to userRegister
```

#### 🌎 Ioc

```typescript
class Example {
    public constructor(
        private eventBus: EventEmitterBus<EventType>
    ) {
    }

    public example(){
        // code ...
        this.eventBus.dispatch("event1", 1);
        // code ...
    }
}
```


## 🏓 Use Event Provider

### 🚡 Enum Events Types

```typescript
enum EventName {
    Example = "Example",
}
```

```typescript
import { type EventObjectType } from "@odg/events";

import { type EventName } from "../app/Enums";

export interface EventExampleParameters {
    // anything params
}

export interface EventBaseInterface extends EventObjectType {
    [EventName.Example]: EventExampleParameters;
}

// IF the above interface does not have all existing laws in the enum it will report an error
export type EventTypes<T extends Record<EventName, unknown> = EventBaseInterface> = T;
```

### 🥮 Make a provider

```typescript
import {
    EventBusInterface,
    EventServiceProvider as EventServiceProviderBase,
    type EventListener,
} from "@odg/events";
import {
    Container,
    inject, injectable,
} from "inversify";

import { type EventTypes } from "../../Interfaces/EventsInterface";
import { ContainerName, EventName } from "../Enums";
import { type HomeEventListeners } from "../Listeners/HomeEventListeners";

@injectable()
export class EventServiceProvider extends EventServiceProviderBase<EventTypes> {

    @inject(ContainerName.EventBus)
    protected bus!: EventBusInterface<Events>;

    /**
     * Listeners for events in the application.
     *
     * @protected
     * @type {EventListener<EventTypes>}
     * @memberof EventServiceProvider
     */
    protected listeners: EventListener<EventTypes> = {
        [EventName.Example]: [
            {
                listener: new HomeEventListeners(), // You can use inversify
                options: {},
            },
        ],
    };

    public async boot(): Promise<void> {
        await super.boot();
    }

    public async shutdown(): Promise<void> {
        await super.shutdown();
    }

}
```

### 🦻 Use Event Listeners

```typescript
import { type EventListenerInterface } from "@odg/events";
import { LoggerInterface } from "@odg/log";
import { inject, injectable } from "inversify";

import { type EventExampleType, type EventTypes } from "../../Interfaces/EventsInterface";
import { ContainerName, type EventName } from "../Enums"; // If use inversify
import { PageFactoryType } from "../Factory/PageFactory";

@injectable()
export class HomeEventListeners implements EventListenerInterface<EventTypes, EventName.Example> {

    @inject(ContainerName.Logger) // You can use constructor to inject
    public log!: LoggerInterface;

    public async handler({ page }: EventExampleType): Promise<void> {
        await this.log.debug("HomeEventListeners is sended");
    }

}
```


### 💻 Prepare To Develop

Copy `.env.example` to `.env` and add the values according to your needs.

### 📍 Start Project

First install dependencies with the following command

```bash
yarn install
# or
npm install
```

## 📨 Build and Run

To build the project, you can use the following command

> if you change files, you need to run `yarn build` and `yarn start` again

```bash
yarn build && yarn start
# or
yarn dev
```

## 🧪 Teste Code

To Test execute this command

```bash
yarn test
# or
yarn test:watch
```
