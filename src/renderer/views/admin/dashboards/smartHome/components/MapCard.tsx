// Custom components
import Card from 'renderer/components/card/Card';
import { useColorModeValue } from '@chakra-ui/react';
import Map from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoic2ltbW1wbGUiLCJhIjoiY2wxeG1hd24xMDEzYzNrbWs5emFkdm16ZiJ9.q9s0sSKQFFaT9fyrC-7--g'; // Set your mapbox token her

export default function YourTransfers(props: { [x: string]: any }) {
	const { ...rest } = props;
	const mapStyles = useColorModeValue(
		'mapbox://styles/simmmple/ckwxecg1wapzp14s9qlus38p0',
		'mapbox://styles/simmmple/cl0qqjr3z000814pq7428ptk5'
	);
	return (
		<Card
			justifyContent='center'
			flexDirection='column'
			w='100%'
			pb='20px'
			minH={{ base: '600px', lg: '100%' }}
			{...rest}>
			<Map
				initialViewState={{
					latitude: 37.692,
					longitude: -122.435,
					zoom: 13
				}}
				style={{ borderRadius: '20px', width: '100%', minHeight: '600px' }}
				mapStyle={mapStyles}
				mapboxAccessToken={MAPBOX_TOKEN}
			/>
		</Card>
	);
}
