import React, { useRef, useEffect, type ComponentType } from "react"

export function withHighlight(Component: ComponentType): ComponentType {
    return (props) => {
        const ref = useRef<HTMLDivElement>(null)

        useEffect(() => {
            if (!ref.current) {
                return
            }
            const items = [...ref.current.getElementsByTagName("a")]
            items.forEach((item) => {
                if (item.href.includes("highlight-mock")) {
                    const highlight = document.createElement("mark")

                    let backgroundColor = item.href
                        .split("highlight-mock")[1]
                        .replace(/\//gi, "")
                    if (!backgroundColor.startsWith("#")) {
                        backgroundColor = backgroundColor.replace("#", "")
                    }

                    item.childNodes.forEach((node) => {
                        highlight.appendChild(node)
                    })
                    highlight.style.color = "inherit"
                    highlight.style.backgroundColor = backgroundColor

                    item.parentElement.replaceChild(highlight, item)
                }
            })
        }, [ref.current])

        return <Component {...props} ref={ref} />
    }
}
