import { Badge, Text } from '@chakra-ui/react';
import chroma from 'chroma-js';
import { motion } from 'framer-motion';
import Typist from 'react-typist';

export function Brand() {
  return (
    <Text fontWeight="light" fontSize="3xl" color="gray.700" cursor="default">
      <Badge
        colorScheme="brand"
        variant="solid"
        textTransform="none"
        fontSize="3xl"
        as={motion.div}
        style={{
          color: 'white',
          textShadow: 'none',
          transition: '2s ease-out',
        }}
        whileHover={{
          textShadow: '0 0 10px #fff, 0 0 20px #422AFB, 0 0 50px #fff',
        }}
        animate={{
          background: [
            `linear-gradient(60deg, #422AFB 0%, ${chroma('#422AFB')
              .brighten(0)
              .hex()} 100%)`,
            `linear-gradient(60deg, #422AFB 0%, ${chroma('#422AFB')
              .brighten(1.2)
              .hex()} 100%)`,
            `linear-gradient(60deg, ${chroma('#422AFB')
              .brighten(2)
              .hex()} 0%, #422AFB 100%)`,
            `linear-gradient(60deg, ${chroma('#422AFB')
              .brighten(-0.5)
              .hex()} 100%, #422AFB 50%)`,
            `linear-gradient(60deg, ${chroma('#422AFB')
              .brighten(0.5)
              .hex()} 0%, #422AFB 100%)`,
            `linear-gradient(60deg, #422AFB 0%, ${chroma('#422AFB')
              .brighten(0)
              .hex()} 100%)`,
          ],
          transition: {
            duration: 10,
            type: 'spring',
            //repeat: Number.POSITIVE_INFINITY,
            repeat: 1,
          },
        }}
      >
        <Typist
          startDelay={1000}
          avgTypingDelay={250}
          cursor={{ hideWhenDone: true }}
        >
          Electrocrud
          <Typist.Backspace count={4} />
          <Text fontWeight="bold" as="span">
            CRUD
          </Text>
          <Typist.Delay ms={500} />
          <Text fontWeight="extrabold" as="span" ml={2}>
            v3
          </Text>
        </Typist>
      </Badge>
    </Text>
  );
}
