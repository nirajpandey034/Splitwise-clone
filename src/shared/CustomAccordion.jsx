/* eslint-disable react/prop-types */
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
export default function CustomAccordion({ title, child = [] }) {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1-content'
          id='panel1-header'
        >
          {title}
        </AccordionSummary>
        <AccordionDetails>
          {child.length > 0 && child.map((item) => item)}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
