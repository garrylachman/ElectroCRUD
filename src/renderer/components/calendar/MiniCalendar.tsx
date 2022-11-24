import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'renderer/assets/css/MiniCalendar.css';
import { Text, Icon } from '@chakra-ui/react';
// Chakra imports
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
// Custom components
import Card from 'renderer/components/card/Card';

export default function MiniCalendar(props: {
  selectRange: boolean;
  [x: string]: any;
}) {
  const { selectRange, ...rest } = props;
  const [value, onChange] = useState(new Date());
  return (
    <Card
      alignItems="center"
      flexDirection="column"
      w="100%"
      maxW="max-content"
      p="20px 15px"
      h="max-content"
      {...rest}
    >
      <Calendar
        onChange={onChange}
        value={value}
        selectRange={selectRange}
        view="month"
        tileContent={<Text color="brand.500" />}
        prevLabel={<Icon as={MdChevronLeft} w="24px" h="24px" mt="4px" />}
        nextLabel={<Icon as={MdChevronRight} w="24px" h="24px" mt="4px" />}
      />
    </Card>
  );
}
