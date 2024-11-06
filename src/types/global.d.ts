declare global {
    namespace JSX {
        interface IntrinsicElements {
            'x-modal': React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
        }
    }
}

declare module 'lottie-api';
