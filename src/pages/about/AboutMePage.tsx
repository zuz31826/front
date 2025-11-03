import { useAboutMe } from "../../context/AboutMeContext";
import AboutMeText from "./components/aboutMeText/AboutMeText";
import AboutMeTopPh from "./components/aboutMeTopPh/AboutMeTopPh";
import HorizontalCarousel from "./components/horizontalCarousel/HorizontalCarousel";
import Skeleton from "../../components/skeleton/Skeleton";
import "./aboutMePage.css";

const AboutMePage = () => {
	const { aboutMe, loading, error } = useAboutMe();

	if (loading) {
		return (
			<div className="aboutMeContainer loading">
				<Skeleton className="aboutMeSkeletonHeader" />
				<Skeleton className="aboutMeSkeletonParagraph" />
				<Skeleton className="aboutMeSkeletonCarousel" />
			</div>
		);
	}

	if (error) {
		return (
			<div className="aboutMeContainer error">
				<p>
					Something went wrong while loading the content. Please try again
					later.
				</p>
			</div>
		);
	}

	if (!aboutMe?.length) {
		return (
			<div className="aboutMeContainer empty">
				<p>No information available at the moment.</p>
			</div>
		);
	}

	const { autoportrets, costumes, jestem, mirror, noTitle, exhibition } =
		aboutMe[0] || {};

	const renderCarousel = (data?: any[], key?: string) => {
		if (!data?.length) return null;
		return (
			<HorizontalCarousel
				key={key}
				images={data.map((item) => ({
					id: item.id,
					url: item.url,
					alternativeText: item.alternativeText,
				}))}
			/>
		);
	};

	return (
		<div className="aboutMeContainer">
			<AboutMeTopPh />

			<AboutMeText
				mb
				text="Creating has always been essential to me — it’s how I make sense of the world. It’s as if my sensitivity could be a strength rather than a burden. Although, as a teenager, I once decided that being “artsy” wasn’t cool anymore, I eventually got over myself and chose to attend art school. It didn’t even feel like a conscious decision at the time — I was simply trying to save myself through creation."
			/>
			<AboutMeText
				mb
				text="In 2020, at the start of the pandemic, I began studying stage design with elements of fashion design at UAP in Poznań. I was surprised to get in on my first try — my artistic skills felt a bit rusty back then. During my studies, I explored many different mediums: design, photography, graphic design, animation, drawing, and painting. Above all, I focused on refining my creative process and learning to think critically about every project. I also learned how to take feedback — and to collaborate, even when it bruised my ego."
			/>

			{renderCarousel(autoportrets, "autoportrets")}

			<AboutMeText
				mb
				text="I felt the most free when designing costumes — experimenting with form and texture while staying mindful of the characters I wanted to portray. We had to photograph our creations for documentation, and that quickly became my favorite part. I got to design the makeup, choose the scenography, and decide how to frame my images. Costume design and photography felt deeply personal and interconnected for me."
			/>

			{renderCarousel(costumes, "costumes")}

			<AboutMeText
				mb
				text="Photography, especially, gave me space for one-on-one collaboration. I loved inviting people into my vision — listening to how they felt about it and how their emotions could shape the final image. I completed two photography projects exploring gender identity and body image — themes that resonate deeply with me. Including my friends in these works made them even more meaningful and authentic."
			/>

			{renderCarousel(jestem, "jestem")}
			{renderCarousel(mirror, "mirror")}

			<AboutMeText
				mb
				text="One of my most personal projects was a self-portrait series that unexpectedly touched something profound in me. It rekindled my fascination with surrealism, dreams, and self-identity. I began writing down fragments of early childhood memories — not worrying whether they were real — and, in my shared university apartment, I photographed myself embodying those recollections. Seeing my adult self appear so small and fragile in those images stirred something powerful within me."
			/>

			{renderCarousel(noTitle, "noTitle")}

			<AboutMeText
				text="Even so, art school often felt like a trial episode. I absorbed everything I could, but I still didn’t know what kind of art I truly wanted to make. I was searching for something more intimate — something rooted in the human experience, in emotion and touch.
That’s when I discovered tattooing. I had always doodled on people’s skin as a way of saying, I like you, I feel close to you — here’s a piece of my inner world; I hope you like it. At first, I felt lost, until a friend gifted me a tattooing kit. After watching a five-minute YouTube video on hand-poked tattoos, everything suddenly clicked. The process came naturally, and the permanence — which once scared me — began to feel thrilling, like playing with time. For the first time, I saw skin as a living canvas, and realized that others might see value in that too."
			/>
			<AboutMeText text="The next day, I tattooed my partner. The day after, a friend offered to pay me — and just like that, I became a tattoo artist." />
			<AboutMeText
				mb
				text="A year later, I transitioned to machine tattooing, which allowed me to be more physically expressive. Around the same time, I returned to my sketchbooks, filling them with drawings that eventually led me back to painting. Slowly, I began to grow into myself. My art finally felt like it belonged to me.
Tattooing taught me that art doesn’t have to live on a wall — it can live, move, and breathe with the person who wears it. That understanding reshaped how I think about all forms of creation."
			/>

			<AboutMeText
				mb
				text="In September 2024, I held my first solo exhibition, Skin Portals, at Transparent Platform in Berlin. I collaborated with DanoMoon, a fashion designer whose work I deeply connect with, to create a fashion-inspired installation and clothing display. The show was a tribute to my beginnings in costume design and my love for tattooing — both rooted in the act of adorning the body."
			/>

			{renderCarousel(exhibition, "exhibition")}

			<AboutMeText text="Across all the mediums I’ve explored, my artistic focus always returns to the human body: as subject, as space, as surface. The body clothed, decorated, loved, cherished, and seen — it is at the center of everything I create." />
			<AboutMeText text="Tattooing has taught me about trust, mutual respect, and the kind of quiet magic that emerges from collaboration. From sketchbooks to skin, from costume to canvas, I’ve learned that every surface tells a story — and I’m still discovering new ways for art and the body to evolve together." />
		</div>
	);
};

export default AboutMePage;
