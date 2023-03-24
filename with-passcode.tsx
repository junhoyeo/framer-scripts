import React, { ComponentType, useState, useMemo, useEffect, useCallback } from "react"
import { sha512 } from "js-sha512"

// SHA512-encoded passcode hardcoded here
const PASSCODE =
    "d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db"

export function withPasscode(Component): ComponentType {
    return (props) => {
        const [passcode, setPasscode] = useState<string>("")

        // Listen to messages from the iframe
        useEffect(() => {
            const handler = (event: any) => {
                if (event.data.type === "passcodeChange") {
                    setPasscode(event.data.value)
                }
            }

            window.addEventListener("message", handler)

            return () => {
                window.removeEventListener("message", handler)
            }
        }, [])

        const hashedPasscode = useMemo(
            () => sha512.create().update(passcode).hex(),
            [passcode]
        )

        const onLoad = useCallback((e: any) => {
            console.log(e)
            const iframe = e.target
            const handleClick = (e: any) => {
                e.preventDefault()
                const target = e.target.cloneNode(true)
                console.log({target})
                target.style.display = "none"
                document.body.appendChild(target)
                target.click()
                document.body.removeChild(target)
            }
            const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
            [...iframeDoc.querySelectorAll('a')].map(v => {
                v.target = '_top'
            })
            iframeDoc.addEventListener("click", handleClick);
        }, [])

        if (hashedPasscode !== PASSCODE) {
            return (
                <iframe
                    src="/passcode-required"
                    sandbox="allow-forms allow-pointer-lock	allow-same-origin allow-scripts"
                    onLoad={onLoad}
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                        width: "100%",
                        height: "100%",
                    }}
                />
            )
        }

        return (
            <Component {...props} />
        )
    }
}

export function create() {
    throw new Error("Function not implemented.")
}
