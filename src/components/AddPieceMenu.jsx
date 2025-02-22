/*
	AddPieceMenu.jsx
	----------------

	This component will be a light wrapper for a PieMenu component,
	configured for the Tangram pieces.
*/

// components
import { PieMenu } from './PieMenu';
import { PieItem } from './PieItem';
import { Shape } from './Shape';

// PieMenu component
export const AddPieceMenu = ({game, onItemSelect, children, ...props}) => {

	return (
		<PieMenu 
			x={game.addShapePieMenu.x.value}
			y={game.addShapePieMenu.y.value}
			menuSize={400}
			closing={game.addShapePieMenu.closing.value}
			{...props}
			onItemSelect={onItemSelect}
		>
			<PieItem title="Small Square" slug="squareSM">
				<Shape shape="squareSM" color="red" rawScale={0.5}></Shape>
			</PieItem>
			<PieItem title="Medium Square" slug="squareMD">
				<Shape shape="squareMD" color="blue" rawScale={0.5}></Shape>
			</PieItem>
			<PieItem title="Large Square" slug="squareLG">
				<Shape shape="squareLG" color="green" rawScale={0.45}></Shape>
			</PieItem>
			<PieItem title="Small Triangle" slug="triangleSM">
				<Shape shape="triangleSM" color="orange" rawScale={0.5}></Shape>
			</PieItem>
			<PieItem title="Medium Triangle" slug="triangleMD">
				<Shape shape="triangleMD" color="purple" rawScale={0.5}></Shape>
			</PieItem>
			<PieItem title="Large Triangle" slug="triangleLG">
				<Shape shape="triangleLG" color="yellow" rawScale={0.45}></Shape>
			</PieItem>
			<PieItem title="Parallelogram A" slug="parallelogramA">
				<Shape shape="parallelogramA" color="pink" rawScale={0.5}></Shape>
			</PieItem>
			<PieItem title="Parallelogram B" slug="parallelogramB">
				<Shape shape="parallelogramB" color="brown" rawScale={0.5}></Shape>
			</PieItem>
			<PieItem title="Trapezoid" slug="trapezoid">
				<Shape shape="trapezoid" color="gray" rawScale={0.5}></Shape>
			</PieItem>
		</PieMenu>
	);
}
