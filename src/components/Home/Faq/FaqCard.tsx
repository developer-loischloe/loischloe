import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqProps {
  id: number;
  question: string;
  answer: string;
}
const FaqCard = ({ faq }: { faq: FaqProps }) => {
  return (
    <AccordionItem
      value={`item-${faq.id}`}
      className="bg-white border-none px-5 rounded-md border !border-brand_primary"
    >
      <AccordionTrigger className="text-start">
        Q. {faq.question}
      </AccordionTrigger>
      <AccordionContent className="text-brand_gray">
        A. {faq.answer}
      </AccordionContent>
    </AccordionItem>
  );
};

export default FaqCard;
