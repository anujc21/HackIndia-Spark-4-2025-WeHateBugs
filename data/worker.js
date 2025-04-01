export default {
    async fetch(request, env) {
        try {
            const { prompt, style } = await request.json();

            // Define style mappings (expandable)
            const stylePrompts = {
                "realistic": "highly detailed, photorealistic, cinematic lighting",
                "anime": "anime style, vibrant colors, studio Ghibli inspired",
                "ghibli": "soft brush strokes, fantasy, inspired by Studio Ghibli, whimsical scenery",
                "cyberpunk": "cyberpunk aesthetic, neon lights, futuristic cityscape",
                "minimalist": "minimalist, flat design, modern art"
            };

            // Default to realistic if style is not provided or invalid
            const styleDescription = stylePrompts[style?.toLowerCase()] || stylePrompts["realistic"];
            const modifiedPrompt = `${prompt}, ${styleDescription}`;

            // Cloudflare AI Model Call
            const ai = env.AI;
            const model = "@cf/black-forest-labs/flux-1-schnell";  
            const inputs = { prompt: modifiedPrompt };

            const response = await ai.run(model, inputs);

            // Convert Base64 to binary Buffer
            const imageBuffer = Uint8Array.from(atob(response.image), c => c.charCodeAt(0));

            // Return binary image response
            return new Response(imageBuffer, {
                headers: {
                    "Content-Type": "image/png",
                    "Cache-Control": "no-store"
                }
            });

        } catch (error) {
            return new Response(`Error generating image: ${error}`, { status: 500 });
        }
    }
};
