// Welcome to Code in Framer
// Get Started: https://www.framer.com/docs/guides/
import React, { useEffect, useMemo } from "react"
import { addPropertyControls, ControlType } from "framer"

/**
 * These annotations control how your component sizes
 * Learn more: https://www.framer.com/docs/guides/auto-sizing
 * 여기에 있는 주석은 Framer에서 컴포넌트의 크기를 조절하는 방법을 명시해줍니다!
 * 높이는 padding에 따라 자동, 너비는 모두 허용(any)로 설정했어요.
 *
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight auto
 */
export default function PasscodeInput(props) {
    const borderRadius = useMemo(
        () =>
            props.isRadiusMixed
                ? `${props.topLeftRadius}px ${props.topRightRadius}px ${props.bottomRightRadius}px ${props.bottomLeftRadius}px`
                : `${props.radius}px`,
        [props]
    )
    const padding = useMemo(
        () =>
            props.isPaddingMixed
                ? `${props.paddingTop}px ${props.paddingRight}px ${props.paddingBottom}px ${props.paddingLeft}px`
                : `${props.padding}px`,
        [props]
    )

    // 만약 Made in Framer 배지가 표시되는 경우, iframe으로 임베딩되는 특성상 중복으로 표시될 수 있으니 제거
    useEffect(() => {
        const badge = document.querySelector("#__framer-badge-container") as
            | HTMLDivElement
            | undefined
        if (badge) {
            badge.style.display = "none"
        }
    }, [])

    return (
        <input
            // Input의 placeholder와 스타일을 주입할 수 있도록 합니다.
            placeholder={props.placeholder}
            style={{
                ...{
                    width: "100%",
                    border: 0,
                    background: props.background,
                    color: props.text,
                    fontFamily: props.fontFamily,
                    fontSize: props.fontSize,
                    fontWeight: props.fontWeight,
                    borderRadius,
                    padding,
                },
                ...props.style,
            }}
            // Input의 값이 바뀔 때마다 window.postMessage를 통해 메시지를 전달합니다.
            onChange={(e) =>
                parent.postMessage({
                    type: "passcodeChange",
                    value: e.target.value,
                })
            }
        />
    )
}

PasscodeInput.defaultProps = {
    background: "#F2F2F2",
    text: "Poppins",
    fontSize: 18,
    placeholder: "Input Passcode",
}

addPropertyControls(PasscodeInput, {
    background: { type: ControlType.Color, title: "Fill" },
    text: { type: ControlType.Color, title: "Text" },
    fontFamily: { type: ControlType.String, title: "Font Family" },
    fontSize: { type: ControlType.Number, title: "Font Size" },
    fontWeight: { type: ControlType.Number, title: "Font Weight" },
    letterSpacing: { type: ControlType.Number, title: "Letter Spacing" },
    lineHeight: { type: ControlType.Number, title: "Line Height" },
    radius: {
        type: ControlType.FusedNumber,
        title: "Radius",
        defaultValue: 4,
        toggleKey: "isRadiusMixed",
        toggleTitles: ["All", "Individual"],
        valueKeys: [
            "topLeftRadius",
            "topRightRadius",
            "bottomRightRadius",
            "bottomLeftRadius",
        ],
        valueLabels: ["NW", "NE", "SE", "SW"],
        min: 0,
    },
    padding: {
        type: ControlType.FusedNumber,
        title: "Padding",
        defaultValue: 16,
        toggleKey: "isPaddingMixed",
        toggleTitles: ["All", "Individual"],
        valueKeys: [
            "paddingTop",
            "paddingRight",
            "paddingBottom",
            "paddingLeft",
        ],
        valueLabels: ["T", "R", "B", "L"],
        min: 0,
    },
    placeholder: {
        type: ControlType.String,
        title: "Placeholder",
    },
})
