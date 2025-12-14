'use client';

import { useState, useRef, FormEvent, useEffect } from 'react';
import { Send, Check, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { processUserMessage, confirmAndSaveTransaction } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

type Message = {
  id: number;
  type: 'user' | 'bot' | 'confirmation';
  text: string;
  payload?: any;
};

export function TransactionChat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, type: 'bot', text: 'Olá! Registre um gasto. Ex: "Comprei café por R$ 15 agora"' }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userMessage: Message = { id: Date.now(), type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsProcessing(true);

    const result = await processUserMessage(currentInput);
    
    if (result.error) {
        const botMessage: Message = { id: Date.now() + 1, type: 'bot', text: result.error };
        setMessages(prev => [...prev, botMessage]);
    } else {
        const confirmationMessage: Message = {
            id: Date.now() + 1,
            type: 'confirmation',
            text: `Confirma o gasto de R$ ${result.amount?.toFixed(2).replace('.', ',')} em ${result.category}?`,
            payload: { ...result, originalMessage: currentInput }
        };
        setMessages(prev => [...prev, confirmationMessage]);
    }
    setIsProcessing(false);
  };
  
  const handleConfirmation = async (confirmed: boolean, payload: any) => {
    setMessages(prev => prev.filter(m => m.type !== 'confirmation'));

    if (confirmed) {
        setIsProcessing(true);
        const result = await confirmAndSaveTransaction(payload);
        
        if(result.success) {
            toast({
                title: 'Sucesso!',
                description: 'Transação salva.',
                className: 'bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700'
            });
            router.refresh();
        } else {
             toast({
                variant: 'destructive',
                title: 'Erro!',
                description: result.error || 'Não foi possível salvar a transação.',
            });
        }
        setIsProcessing(false);
    } else {
        const botMessage: Message = { id: Date.now(), type: 'bot', text: 'Ok. Por favor, digite a transação novamente com as correções.' };
        setMessages(prev => [...prev, botMessage]);
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Sparkles className="h-5 w-5 text-accent" />
          Registro Rápido
        </CardTitle>
        <CardDescription>Converse para adicionar um novo gasto.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
        <ScrollArea className="flex-1 pr-4 -mr-4">
          <div className="space-y-4 pr-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.type === 'confirmation' ? (
                     <div className="bg-card border p-3 rounded-lg max-w-sm w-full shadow-md">
                        <p className="text-sm">{msg.text}</p>
                        <div className="flex gap-2 mt-3">
                            <Button size="sm" onClick={() => handleConfirmation(true, msg.payload)} disabled={isProcessing}>
                                <Check className="mr-1.5 h-4 w-4" /> Salvar
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleConfirmation(false, msg.payload)} disabled={isProcessing}>
                               <X className="mr-1.5 h-4 w-4" /> Corrigir
                            </Button>
                        </div>
                     </div>
                ) : (
                    <div className={`p-3 rounded-lg max-w-sm ${msg.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    </div>
                )}
              </div>
            ))}
            {isProcessing && (
              <div className="flex justify-start">
                  <div className="p-3 rounded-lg bg-muted inline-flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-0"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-300"></div>
                  </div>
              </div>
            )}
             <div ref={endOfMessagesRef} />
          </div>
        </ScrollArea>
        <form onSubmit={handleSubmit} className="flex gap-2 border-t pt-4">
          <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ex: Jantar por R$50" disabled={isProcessing} />
          <Button type="submit" disabled={!input.trim() || isProcessing} aria-label="Enviar">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
