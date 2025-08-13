import * as React from "react"

const WooSvg = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 56 56"
        fill="none"
        {...props}
    >
            <path fill="url(#a)" d="M0 0h56v56H0z" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.001 18.036 18.36 38.82c.215.702.852 1.18 1.573 1.18h3.285a1.65 1.65 0 0 0 1.532-1.059l3.225-8.254a.027.027 0 0 1 .05 0l3.263 8.26A1.649 1.649 0 0 0 32.818 40h3.136a1.65 1.65 0 0 0 1.57-1.172L40.585 29h-5.22l-.892 2.936a.027.027 0 0 1-.05.003l-2.93-6.672c-1.368-2.97-5.508-2.98-6.89-.017L21.5 31.939a.027.027 0 0 1-.05-.004L17.347 18h-5.32a.027.027 0 0 0-.026.036zM36.276 26h5.243l2.48-7.964a.027.027 0 0 0-.026-.036h-5.266l-2.43 8z"
                fill="#fff"
            />
            <defs>
                    <linearGradient
                        id="a"
                        x1={10.418}
                        y1={9.712}
                        x2={68.147}
                        y2={76.017}
                        gradientUnits="userSpaceOnUse"
                    >
                            <stop stopColor="#1A1E21" />
                            <stop offset={1} stopColor="#06060A" />
                    </linearGradient>
            </defs>
    </svg>
)

export default WooSvg
