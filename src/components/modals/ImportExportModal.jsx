/*
	ImportExportModal.jsx
	---------------------

	Modal to show import/export options.
*/

// react imports
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRef } from "react";

// components
import { Modal } from "../Modal";
import { ModalButtonBar } from "../ModalButtonBar";

// our classes
import ModalManager from "../../classes/ModalManager";

// main component
export const ImportExportModal = ({ game, onClose }) => {

	// ref to our modal and file picker input
	const modalRef = useRef(null);
	const fileInputRef = useRef(null);

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

	// handle file change when upload a JSON file
	const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file && file.type === "application/json") {
            const reader = new FileReader();

            reader.onload = (e) => {
                try {

					const JSONString = e.target.result;         

                    // Clear the input field
                    if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                    }

					// close the modal
					modalRef.current.close();

					// Import the JSON
					game.importExportManager.importJSON(JSONString);

                } catch (error) {
                    console.error("Error parsing JSON:", error);
                    alert("Invalid JSON file.");
                }
            };

            reader.readAsText(file);
        } else {
            alert("Please select a valid JSON file.");
        }
    };
	
	// render
	return (

		<Modal 
			ref={modalRef}
			game={game}
			modalKey={ModalManager.MODALS.WELCOME}
			showClose={true}
			title="Import / Export"
			materialIcon="import_export"
			onClose={handleClose}
			style={{ width: '450px', minWidth: '450px', maxHeight: '70%' }}
		>
			<div css={style} align="left">
				
				<h2>Export</h2>
				<ul align="left">
					<li>
						<span className="material-icons">download</span>
						<a onClick={game.importExportManager.exportJSON}>
							Download the current project as a JSON file.
						</a>
					</li>
					<li>
						<span className="material-icons">download</span>
						<a onClick={game.importExportManager.exportSVG}>
							Download the current project as an SVG file.
						</a>
					</li>
					<li>
						<span className="material-icons">download</span>
						<a onClick={game.importExportManager.exportPNG}>
							Download the current project as an PNG file.
						</a>
					</li>					
				</ul>

				<h2>Import</h2>
				<p align="left">If you have a JSON previously exported, you can import it here</p>
				<ul align="left">
					<input 
						type="file"
						accept=".json"
						onChange={handleFileChange}
						ref={fileInputRef}
					/>
				</ul>
				
			</div>
			<ModalButtonBar
				buttonsList={[
					['Close', 'close', true],
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

	height: 310px;
	margin-bottom: 10px;
	overflow: hidden;

	h2 {
		margin: 0px;
	}

	li {
		line-height: 30px;
		span {

			position: relative;
			top: 7px;
			margin-right: 10px;
			font-weight: bold;
			background: rgba(0, 0, 0, 0.1);
			padding: 0px 5px;
			border-radius: 5px;
			
			&.down {
				transform: translateY(7px);
			
			}
		}// span

		a {
			cursor: pointer;
		}
	}// il
`;
