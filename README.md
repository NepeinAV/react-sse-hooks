# React SSE hooks
Is a pretty simple set of hooks that can help you implement interaction with your SSE (Server Sent Events) server.

This library works perfectly with both React and React Native.

By the way, [there is cool library for React Native](https://github.com/NepeinAV/rn-eventsource-reborn) that implements EventSource standard 😏.

## How it works?
### **Step 1**
Wrap your app with `EventSourceProvider` component in any place that you want to work with SSE.

```jsx
const App: React.FC = () => {
    return (
        <EventSourceProvider>
            <Chat />
        </EventSourceProvider>
    )
}
```

What cool about this provider is that you can provide your own EventSource implementation. You can use any kind of polyfills for Web or React Native that implements [base EventSource standard](https://developer.mozilla.org/en-US/docs/Web/API/EventSource).

Just pass `eventSource` prop to provider like that (by default it uses built in your environment EventSource implementation):

```jsx
<EventSourceProvider eventSource={EventSource}>
    ...
</EventSourceProvider>
```
Now you can create connection to your server within this provider.
### **Step 2**
Create new connection with `useEventSource` hook.

```jsx
const Chat = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    const chatSource = useEventSource({
        source: 'https://www.example.com/stream?token=blah',
    });

    ...
}
```

It returns new (or already existing in EventSourceProvider) instance of EventSource.

You can pass additional connection options in `options` field:

```jsx
const Chat = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    const chatSource = useEventSource({
        source: 'https://www.example.com/stream?token=blah',
        options: {
            withCredentials: true,
        },
    });

    ...
}
```

### **Step 3**
Create event listeners with `useEventSourceListener`.

```jsx
const Chat = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    const chatSource = useEventSource({
        source: 'https://www.example.com/stream?token=blah',
    });

    const { startListening, stopListening } = useEventSourceListener<ChatMessage>(
        {
            source: chatSource,
            startOnInit: true,
            event: {
                name: ChatEvent.NewMessage,
                listener: ({ data }) => setMessages([...messages, data]),
            },
        },
        [chatSource],
    );

    ...
}
```

Second argument is dependency array. It works like `useEffect` hook - if it changes, listener will automatically recreate itself with current LexicalEnvironment.

That's it!

```
Don't remember to add "DOM" lib to your tsconfig.json to get EventSource typings!
```

## API reference

### **`EventSourceProvider`**

| Prop | Type | Definition |
| ------------- | - | -------------|
| eventSource | typeof EventSource | EventSourceProvider will use this custom EventSource implementation for new connections |

### **`useEventSource`**

```ts
useEventSource<CustomEventSourceOptions, CustomEventSource>({
    source: string,
    options: {
        withCredentials: boolean,
    },
});
```

### **`useEventSourceListener`**

```ts
const {
    startListening: () => void,
    stopListening: () => void,
} = useEventSourceListener<T>(
    listenerOptions: {
        source: EventSource,
        startOnInit: boolean,
        event: {
            name: string,
            listener: (event: { data: T | undefined, event: Event }) => void,
            options?: boolean | AddEventListenerOptions | EventListenerOptions,
        },
    },
    dependencies: any[],
);
```

`stopListening` method stops listening until you manually start it again using `startListening` even one element of the dependency array changes.