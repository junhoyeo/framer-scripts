import React, { useRef, useEffect } from "react"
import type { ComponentType } from "react"

export function withHighlight(Component: any): ComponentType {
    const ANIMATION_DELAY = 900 // Customize this value (in milliseconds)

    return (props) => {
        const ref = useRef<any>(null)

        useEffect(() => {
            if (!ref.current) {
                return
            }
            const items = [...ref.current.getElementsByTagName("a")]

            // Attach the animation keyframes
            const style = document.createElement("style")
            style.innerHTML = `
            .mark[data-observed="true"] span {
                animation-play-state: running;
            }
          `
            document.head.appendChild(style)

            // Create the intersection observer
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        const pseudoElement = entry.target.querySelector("span") as HTMLSpanElement

                        if (entry.isIntersecting) {
                            entry.target.setAttribute("data-observed", "true")
                            pseudoElement.style.opacity = "1"
                            pseudoElement.style.width = "0"
                            setTimeout(() => {
                                pseudoElement.style.width = "100%"
                            }, ANIMATION_DELAY)
                        } else if (!entry.isIntersecting) {
                            entry.target.setAttribute("data-observed", "false")
                            pseudoElement.style.width = "0"
                            pseudoElement.style.opacity = "0"
                        }
                    })
                },
                { threshold: 0.1 }
            )

            items.forEach((item) => {
                if (item.href.includes("highlight-mock")) {
                    const highlight = document.createElement("mark")
                    highlight.className += " mark"

                    let backgroundColor = item.href
                        .split("highlight-mock")[1]
                        .replace(/\//gi, "")
                    if (!backgroundColor.startsWith("#")) {
                        backgroundColor = backgroundColor.replace("#", "")
                    }

                    item.childNodes.forEach((node) => {
                        highlight.appendChild(node)
                    })

                    highlight.style.position = "relative"
                    highlight.style.color = "inherit"
                    highlight.style.backgroundColor = "unset"

                    // Create a pseudo-element using a span
                    const pseudoElement = document.createElement("span")
                    pseudoElement.style.content = ""
                    pseudoElement.style.display = "inline-block"
                    pseudoElement.style.position = "absolute"
                    pseudoElement.style.width = "100%"
                    pseudoElement.style.height = "100%"
                    pseudoElement.style.zIndex = "-1"
                    pseudoElement.style.top = "0"
                    pseudoElement.style.left = "0"
                    pseudoElement.style.background = `linear-gradient(to top, ${backgroundColor} 50%, transparent 50%)`
                    pseudoElement.style.transition = "width 0.2s ease"
                    // pseudoElement.style.animation = `highlight 0.16s 1 alternate ${ANIMATION_DELAY}ms paused`

                    // Add the pseudo-element to the highlight element
                    highlight.appendChild(pseudoElement)

                    item.parentElement.replaceChild(highlight, item)

                    // Observe the highlight element
                    observer.observe(highlight)
                }
            })

            // Clean up the observer when the component is unmounted
            return () => {
                items.forEach((item) => observer.unobserve(item))
            }
        }, [ref.current])

        return <Component {...props} ref={ref} />
    }
}
