import * as React from "react"

const EnjSvg = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" {...props}>
        <path fill="url(#a)" d="M0 0h56v56H0z" />
        <path
            d="M38.765 36H25.23c-3.167-.006-5.321-2.257-6.592-5h20.417C40.728 31 42 29.623 42 28s-1.272-3-2.945-3H18.363c.999-2.727 3.853-5.003 6.867-5h13.535c1.671 0 2.945-1.278 2.945-2.887 0-1.623-1.29-3.113-2.945-3.113H25.23C17.92 14 12 20.29 12 28v.42c.107 3.635 1.547 7.084 4.016 9.619 2.468 2.534 5.773 3.954 9.214 3.961h13.535c1.673 0 2.945-1.49 2.945-3.113S40.438 36 38.765 36z"
            fill="#fff"
        />
        <defs>
            <linearGradient
                id="a"
                x1={53.433}
                y1={42.436}
                x2={11.324}
                y2={5.896}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#9468FF" />
                <stop offset={1} stopColor="#ADF8FF" />
            </linearGradient>
        </defs>
    </svg>
)

export default EnjSvg
