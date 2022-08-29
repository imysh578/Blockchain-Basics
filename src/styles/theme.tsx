/**
 * Styles settings
 */

export const fontWeight = {
	light: 300,
	regular: 400,
	medium: 500,
	semiBold: 600,
	bold: 700,
};

export const color = {
	black: "#000",
	white: "#fff",

	dark: "#333",
	gray: "#636363",
	light: "#eee",
	
	primary: "#FFB412",
	secondary: "#F69C2E",
	tertiary: "#5551a4bf",
	
	success: "#6dd784",
	error: "#ff6b6b",
	readonly: "#636363",

	bg: "#ebebeb",
	successBg: "#6dd78433",
	errorBg: "#ff6b6b33",
};

export const boxShadow = {
	style1:
		"rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
	style2: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
};

export const zIndex = {
	navbar: 999,
	container: 1,
	content: 10,
	upper: 20,
	openNavbar: 1000,
};

export const height = {
	navbar: "4rem",
};

export const width = {
	xxs: "480px",
	xs: "600px",
	sm: "768px",
	md: "900px",
	lg: "1024px",
	xl: "1280px",
};

export const breakpoint = {
	xs: `screen and (max-width: ${width.xs})`,
	sm: `screen and (max-width: ${width.sm})`,
	md: `screen and (max-width: ${width.md})`,
	lg: `screen and (max-width: ${width.lg})`,
	xl: `screen and (max-width: ${width.xl})`,
};

export const mixins = {
	// flex
	flexBox: (direction = "row", justify = "center", align = "center") => `
    display: flex;
    flex-direction: ${direction};
    justify-content: ${justify};
    align-items: ${align};
  `,

	// grid
	gridBox: (
		justifyItems = "center",
		justifyContent = "center",
		align = "center"
	) => `
    display: grid;
    justify-items: ${justifyItems};
    justify-content: ${justifyContent};
    align-items: ${align};
  `,

	// position
	positionCenter: (type = "absolute") => {
		if (type === "absolute" || type === "fixed")
			return `
        position: ${type};
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      `;
		return;
	},
};

export const animation = {
	fadeIn: (transition = "0.5", period = "0.5", repeat = "1") => `
		transition: all ${transition}s;
		animation: fadeIn ${period}s ${repeat};

		@keyframes fadeIn {
			0% {
				opacity: 0;
			}

			100% {
				opacity: 1;
			}
		}
	`,

	rightToLeft: (transition = "0.", period = "1", repeat = "1") => `
		transition: all ${transition}s;
		animation: rightToLeft ${period}s ${repeat};

		@keyframes rightToLeft {
			0% {
				transform: translateX(-100%);
			}

			100% {
				transfrom: translateX(0%);
			}
		}
	`,

	scaleUp: (transition = "0.5", period = "1", repeat = "1") => `
		transition: all ${transition}s;
		animation: scaleUp ${period}s ${repeat};

		@keyframes scaleUp {
			0% {
				transform: scale(0);
				opacity: 0;
			}

			100% {
				transform: scale(1);
				opacity: 1;
			}
		}
	`,
}

export const components = {
	// defualt settings for common components
	container: (direction = "row", justify = "center", align = "center") => `
		${mixins.flexBox(direction, justify, align)}
		position: relative;
		width: 100%;
		height: 100%;
	`,
};
