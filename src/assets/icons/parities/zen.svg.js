import * as React from "react"

const ZenSvg = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" {...props}>
        <path fill="#041742" d="M0 0h56v56H0z" />
        <path
            d="m41.019 18.674-2.617 4.055a11.667 11.667 0 0 1-8.527 16.768c-2.419.396-4.894 0-7.087-1.1l-4.066 2.615a15.974 15.974 0 0 0 25.224-11.715 16.051 16.051 0 0 0-2.927-10.633h.01l-.01.01z"
            fill="url(#a)"
        />
        <path
            d="M28.021 36.016a8.03 8.03 0 0 0 7.906-6.587 18.308 18.308 0 0 0-14.57 3.03 8.045 8.045 0 0 0 6.664 3.557z"
            fill="url(#b)"
        />
        <path
            d="M31.984 27.556c1.374 0 2.73.151 4.075.443a8.044 8.044 0 0 0-14.098-5.295 8.025 8.025 0 0 0-1.902 6.377 17.592 17.592 0 0 0-3.012 2.813 11.665 11.665 0 0 1 9.478-15.413c2.296-.3 4.63.094 6.701 1.13l4.047-2.626A15.974 15.974 0 0 0 12.04 26.88a15.994 15.994 0 0 0 3.097 10.642 19.277 19.277 0 0 1 2.729-3.773 22.687 22.687 0 0 1 2.823-2.475 19.11 19.11 0 0 1 11.304-3.716h-.01z"
            fill="#fff"
        />
        <defs>
            <radialGradient
                id="a"
                cx={0}
                cy={0}
                r={1}
                gradientUnits="userSpaceOnUse"
                gradientTransform="matrix(26.9113 0 0 26.946 41.028 18.655)"
            >
                <stop offset={0.1} stopColor="#26DB8D" />
                <stop offset={0.26} stopColor="#23D29A" />
                <stop offset={0.56} stopColor="#1ABBBB" />
                <stop offset={0.89} stopColor="#0E9DE5" />
            </radialGradient>
            <radialGradient
                id="b"
                cx={0}
                cy={0}
                r={1}
                gradientUnits="userSpaceOnUse"
                gradientTransform="matrix(26.9113 0 0 26.946 41.028 18.655)"
            >
                <stop offset={0.26} stopColor="#23D29A" />
                <stop offset={0.56} stopColor="#1ABBBB" />
                <stop offset={0.89} stopColor="#0E9DE5" />
            </radialGradient>
        </defs>
    </svg>
)

export default ZenSvg
