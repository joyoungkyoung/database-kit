import { useState } from "react";

export default function useInput<T>(initial: T) {
    const [input, setInput] = useState<T>(initial);

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value: any = e.target.value;

        if (e.target.type === "checkbox") value = e.target.checked;
        setInput({ ...input, [e.target.name]: value });
    };

    const onChangeSelect = (e: any) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    return {
        input,
        onChangeInput,
        onChangeSelect,
    };
}
