import React, { ComponentType, useState, useMemo } from "react"
import { sha512 } from "js-sha512"

// SHA512-encoded passcode hardcoded here
const PASSCODE =
    "d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db"

export function withPasscode(Component): ComponentType {
    return (props) => {
        const [passcode, setPasscode] = useState<string>("")

        const hashedPasscode = useMemo(
            () => sha512.create().update(passcode).hex(),
            [passcode]
        )

        if (hashedPasscode !== PASSCODE) {
            return (
                // Add custom styles for your Passcode input page
                <div
                    style={{
                        position: "absolute",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <h1>Input PIN (Hint: Default is 1234)</h1>
                    <input
                        value={passcode}
                        onChange={(e) => setPasscode(e.target.value)}
                    />
                </div>
            )
        }

        return (
            <Component
                {...props}
                // animate={{
                //     background: store.background,
                // }}
                // onClick={() => {
                //     setStore({ background: randomColor() })
                // }}
            />
        )
    }
}

export function create() {
    throw new Error("Function not implemented.")
}
