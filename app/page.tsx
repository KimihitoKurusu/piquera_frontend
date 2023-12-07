import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>Piquera&nbsp;</h1>
				<h1 className={title({ color: "violet" })}>de Taxis&nbsp;</h1>
				<br />
				<h1 className={title()}>
					Departamento de Operaciones
				</h1>
				<h2 className={subtitle({ class: "mt-4" })}>
					Haga click en los botones debajo para empezar.
				</h2>
			</div>

			<div className="flex gap-3">
				<Link
					href='./marca'
					className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
				>
					Marca
				</Link>
				<Link
					href='./taxi'
					className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
				>
					Taxi
				</Link>
				<Link
					href='./cliente'
					className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
				>
					Cliente
				</Link>
				<Link
					href='./sviaje'
					className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
				>
					Solicitud de Viaje
				</Link>
			</div>

			<div className="mt-8">
				<Snippet hideSymbol hideCopyButton variant="flat">
					<span>
						Get started by editing <Code color="primary">app/page.tsx</Code>
					</span>
				</Snippet>
			</div>
		</section>
	);
}
