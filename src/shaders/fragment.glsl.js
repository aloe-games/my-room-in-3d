export default `
uniform sampler2D uBakedNightTexture;
uniform sampler2D uLightMapTexture;

uniform vec3 uLightTvColor;
uniform float uLightTvStrength;

uniform vec3 uLightDeskColor;
uniform float uLightDeskStrength;

uniform vec3 uLightPcColor;
uniform float uLightPcStrength;

varying vec2 vUv;

float blendLighten(float base, float blend) {
	return max(blend,base);
}

vec3 blendLighten(vec3 base, vec3 blend) {
	return vec3(blendLighten(base.r,blend.r),blendLighten(base.g,blend.g),blendLighten(base.b,blend.b));
}

vec3 blendLighten(vec3 base, vec3 blend, float opacity) {
	return (blendLighten(base, blend) * opacity + base * (1.0 - opacity));
}

void main()
{
    vec3 bakedColor = texture2D(uBakedNightTexture, vUv).rgb;
    vec3 lightMapColor = texture2D(uLightMapTexture, vUv).rgb;

    float lightTvStrength = lightMapColor.r * uLightTvStrength;
    bakedColor = blendLighten(bakedColor, uLightTvColor, lightTvStrength);

    float lightPcStrength = lightMapColor.b * uLightPcStrength;
    bakedColor = blendLighten(bakedColor, uLightPcColor, lightPcStrength);

    float lightDeskStrength = lightMapColor.g * uLightDeskStrength;
    bakedColor = blendLighten(bakedColor, uLightDeskColor, lightDeskStrength);

    gl_FragColor = vec4(bakedColor, 1.0);
}
`
