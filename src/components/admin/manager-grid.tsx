import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";


export function ManagerGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Accordion 
                    className="max-w-lg rounded-lg border"
                >
                    <AccordionItem>
                        <AccordionTrigger>Barber 1</AccordionTrigger>
                        <AccordionContent>
                            <p>Appointment details for Barber 1</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <Accordion 
                    className="max-w-lg rounded-lg border"
                >
                    <AccordionItem>
                        <AccordionTrigger>Klipp</AccordionTrigger>
                        <AccordionContent>
                            <p>Appointment details for Klipp</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <Accordion 
                    className="max-w-lg rounded-lg border"
                >
                    <AccordionItem>
                        <AccordionTrigger>Åpningstider</AccordionTrigger>
                        <AccordionContent>
                            <p>Appointment details for Åpningstider</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
        </div>
    );
}
