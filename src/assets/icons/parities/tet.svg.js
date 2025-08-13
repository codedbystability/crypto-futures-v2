import * as React from "react"

const TetSvg = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30 30"
        fill="none"
        {...props}
    >
            <path
                d="M20.572 4.355H9.437L8.355 5.436v19.128l1.082 1.08h11.135l1.081-1.08V5.436l-1.08-1.08Zm-1.081 19.128h-8.982V6.517h8.982v16.966Z"
                fill="url(#a)"
            />
            <path
                d="M18.292 11.998h-2.213V9.785h-2.153v2.213H11.71v2.155h6.582v-2.155Z"
                fill="url(#b)"
            />
            <path
                d="M13.926 20.352h2.156V18.14h2.21v-2.156H11.71v2.155h2.216v2.213Z"
                fill="url(#c)"
            />
            <defs>
                    <linearGradient
                        id="a"
                        x1={8.781}
                        y1={4.611}
                        x2={26.747}
                        y2={16.307}
                        gradientUnits="userSpaceOnUse"
                    >
                            <stop stopColor="#29B3EB" />
                            <stop offset={1} stopColor="#21EDBA" />
                    </linearGradient>
                    <linearGradient
                        id="b"
                        x1={4.153}
                        y1={-23.3}
                        x2={56.431}
                        y2={58.833}
                        gradientUnits="userSpaceOnUse"
                    >
                            <stop stopColor="#29B3EB" />
                            <stop offset={1} stopColor="#21EDBA" />
                    </linearGradient>
                    <linearGradient
                        id="c"
                        x1={7.873}
                        y1={5.167}
                        x2={13.716}
                        y2={27.303}
                        gradientUnits="userSpaceOnUse"
                    >
                            <stop stopColor="#29B3EB" />
                            <stop offset={1} stopColor="#21EDBA" />
                    </linearGradient>
            </defs>
    </svg>
)

export default TetSvg
