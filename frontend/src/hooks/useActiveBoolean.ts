import { useState } from "react";

export default function useActiveBoolean(initValue?: boolean) {
    const [_active, _setActive] = useState<boolean>(initValue || false);

    const setActive = () => _setActive(true);
    const setDeactive = () => _setActive(false);
    const toggleActive = () => _setActive(!_active);

    return { setActive, setDeactive, toggleActive, active: _active };
}
