/*
	HelpModal.jsx
	-------------

	Show Help video and text modal.
*/

// react imports
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useMemo, useRef } from "react";

// components
import { Modal } from "../Modal";
import { ModalButtonBar } from "../ModalButtonBar";

// our classes
import ModalManager from "../../classes/ModalManager";

// main component
export const HelpModal = ({ game, onClose }) => {

	// ref to our modal
	const modalRef = useRef(null);

	// hand button clicks
	const buttonClicked = (buttonAction, buttonName) => {
		switch (buttonAction) {
			case 'close':
				modalRef.current.close();
				break;
		}// swatch 
	};

	// close the modal
	const handleClose = () => {
		if(onClose) onClose();
	};
	
	// render
	return (

		<Modal 
			ref={modalRef}
			game={game}
			modalKey={ModalManager.MODALS.HELP}
			showClose={true}
			title="Help"
			materialIcon="help"
			onClose={handleClose}
			style={{ width: '900px', maxHeight: '70%' }}
		>
			<div css={style}>
				<h2>Here's some interesting and useful help.</h2>
				<p>
				Demand to be let outside at once, and expect owner to wait for me as i think about it scratch and lounge in doorway. Purr purr purr until owner pets why owner not pet me hiss scratch meow kitty power lick butt lie in the sink all day but lie in the sink all day claw your carpet in places everyone can see - why hide my amazing artistic clawing skills? yet unwrap toilet paper. Refuse to come home when humans are going to bed; stay out all night then yowl like i am dying at 4am cough furball or take a deep sniff of sock then walk around with mouth half open for ooh, are those your $250 dollar sandals? lemme use that as my litter box and vommit food and eat it again cat mojo run off table persian cat jump eat fish. Soft kitty warm kitty little ball of furr sit in box i'm bored inside, let me out i'm lonely outside, let me in i can't make up my mind whether to go in or out, guess i'll just stand partway in and partway out, contemplating the universe for half an hour how dare you nudge me with your foot?!?! leap into the air in greatest offense!. Dismember a mouse and then regurgitate parts of it on the family room floor paw your face to wake you up in the morning munch, munch, chomp, chomp furrier and even more furrier hairball sun bathe, or go crazy with excitement when plates are clanked together signalling the arrival of cat food. Leave fur on owners clothes i like to spend my days sleeping and eating fishes that my human fished for me we live on a luxurious yacht, sailing proudly under the sun, i like to walk on the deck, watching the horizon, dreaming of a good bowl of milk brown cats with pink ears stand in doorway, unwilling to chose whether to stay in or go out freak human out make funny noise mow mow mow mow mow mow success now attack human.
				</p>
				<h2>Enjoy this video</h2>				
				<iframe width="560" height="315" src="https://www.youtube.com/embed/y0sF5xhGreA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
			</div>
			<ModalButtonBar
				buttonsList={[
					['thx for the help', 'close', true],
				]}
				onButtonClicked={buttonClicked}
			/>
		</Modal>
	);
}

// styles
const style = css`

	// center the text
	text-align: center;

	height: 600px;
	margin-bottom: 10px;
	overflow-y: auto;
	
`;
