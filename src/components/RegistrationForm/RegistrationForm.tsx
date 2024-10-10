import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SunIcon, MoonIcon } from "@heroicons/react/outline";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  fullName: z.string(),
  email: z.string().min(1, {
    message: "Esse campo é obrigatório.",
  }).email("Formato de e-mail inválido."),
  phone: z.string().min(1, {
    message: "Esse campo é obrigatório.",
  }),
  position: z.enum([
    'Desenvolvedor Frontend',
    'Desenvolvedor Backend',
    'Desenvolvedor Full Stack',
    'Desenvolvedor Mobile',
    'Desenvolvedor de Software',
    'Engenheiro de Software',
    'Arquiteto de Software',
    'UI/UX Designer',
    'Analista de Sistemas',
    'Analista Programador',
    'DevOps Engineer',
    'Engenheiro de Dados',
    'QA Engineer',
    'Scrum Master',
    'Product Owner',
  ], {
    required_error: "Required",
  }),
  linkedin: z.string().optional(),
  github: z.string().optional(),
});



type FormData = z.infer<typeof formSchema>;

export function RegistrationForm() {
  const [theme, setTheme] = useState<string>("dark");
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const onSubmit = (data: FormData) => {
    try {
      localStorage.setItem('member', JSON.stringify(data));
      toast({
        title: '✅ Cadastro realizado com sucesso! 🎉',
        description: 'Você foi cadastrado com sucesso.',
      });
    } catch (error) {
      toast({
        title: '❌ Falha ao cadastrar.',
        description: 'Verifique os dados informados.',
      });
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <h1 className="text-3xl font-bold mb-6 text-center">Cadastro de Membros - Frontend Fusion</h1>
      <button onClick={toggleTheme} className="absolute top-4 right-4 p-2 z-10">
        {theme === "dark" ? <SunIcon className="h-6 w-6 text-white" /> : <MoonIcon className="h-6 w-6 text-gray-800" />}
      </button>
      <div className="w-full max-w-lg p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>🗣️ Nome completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>📧 E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu e-mail" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>📞 Telefone</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu telefone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>💼 Cargo pretendido</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o cargo" />
                      </SelectTrigger>
                      <SelectContent>
                        {['Desenvolvedor Frontend', 'Desenvolvedor Backend', 'Desenvolvedor Full Stack', 'Desenvolvedor Mobile', 'Desenvolvedor de Software', 'Engenheiro de Software', 'Arquiteto de Software', 'UI/UX Designer', 'Analista de Sistemas', 'Analista Programador', 'DevOps Engineer', 'Engenheiro de Dados', 'QA Engineer', 'Scrum Master', 'Product Owner'].map(position => (
                          <SelectItem key={position} value={position}>{position}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>🌐 LinkedIn (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu LinkedIn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="github"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>🐙 GitHub (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu GitHub" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">📋 Cadastrar</Button>
          </form>
        </Form>
      </div>

      <Toaster />
    </div>
  );
}
