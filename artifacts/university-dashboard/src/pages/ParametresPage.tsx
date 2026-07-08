import { useState } from "react";
import { Save, Building2, BookOpen, Users, Shield, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const adminUsers = [
  { id:1, nom:"Administrateur Principal", email:"admin@univ.ci", role:"Super Admin", statut:"Actif", derniere_connexion:"07/07/2024 09:15" },
  { id:2, nom:"Diallo Mariama", email:"m.diallo.admin@univ.ci", role:"Admin Scolarité", statut:"Actif", derniere_connexion:"06/07/2024 14:30" },
  { id:3, nom:"Koné Ibrahima", email:"i.kone.admin@univ.ci", role:"Admin Finance", statut:"Actif", derniere_connexion:"05/07/2024 11:00" },
  { id:4, nom:"Traoré Awa", email:"a.traore.admin@univ.ci", role:"Admin RH", statut:"Inactif", derniere_connexion:"01/06/2024 08:45" },
];

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground border-b border-border pb-2">{title}</h3>
      {children}
    </div>
  );
}

function FieldRow({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-start">
      <Label htmlFor={id} className="sm:pt-2 text-sm text-muted-foreground font-medium">{label}</Label>
      <div className="sm:col-span-2">{children}</div>
    </div>
  );
}

export default function ParametresPage() {
  const [saved, setSaved] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card flex-shrink-0">
        <div>
          <h1 className="text-xl font-bold">Paramètres</h1>
          <p className="text-sm text-muted-foreground">Configuration générale de l'application</p>
        </div>
        <Button className="gap-2 h-9" onClick={handleSave} aria-label="Sauvegarder les modifications">
          <Save size={15} aria-hidden="true" />
          {saved ? "Sauvegardé ✓" : "Sauvegarder"}
        </Button>
      </div>

      <main className="flex-1 overflow-y-auto p-6">
        <Tabs defaultValue="etablissement">
          <TabsList className="mb-6 h-10">
            <TabsTrigger value="etablissement" className="gap-2 text-sm">
              <Building2 size={14} aria-hidden="true" />Établissement
            </TabsTrigger>
            <TabsTrigger value="academique" className="gap-2 text-sm">
              <BookOpen size={14} aria-hidden="true" />Académique
            </TabsTrigger>
            <TabsTrigger value="utilisateurs" className="gap-2 text-sm">
              <Users size={14} aria-hidden="true" />Utilisateurs
            </TabsTrigger>
            <TabsTrigger value="securite" className="gap-2 text-sm">
              <Shield size={14} aria-hidden="true" />Sécurité
            </TabsTrigger>
          </TabsList>

          {/* ── ÉTABLISSEMENT ── */}
          <TabsContent value="etablissement">
            <Card className="border border-card-border shadow-sm max-w-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Informations de l'établissement</CardTitle>
                <CardDescription className="text-xs">Données générales de l'université affichées dans les documents officiels.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormSection title="Identité">
                  <FieldRow label="Nom de l'université" id="univ-nom">
                    <Input id="univ-nom" defaultValue="Université UniGest" className="h-9" />
                  </FieldRow>
                  <FieldRow label="Sigle" id="univ-sigle">
                    <Input id="univ-sigle" defaultValue="UG" className="h-9 max-w-[120px]" />
                  </FieldRow>
                  <FieldRow label="Slogan" id="univ-slogan">
                    <Input id="univ-slogan" defaultValue="L'excellence au service de la nation" className="h-9" />
                  </FieldRow>
                </FormSection>
                <FormSection title="Coordonnées">
                  <FieldRow label="Email officiel" id="univ-email">
                    <Input id="univ-email" type="email" defaultValue="contact@univ.ci" className="h-9" />
                  </FieldRow>
                  <FieldRow label="Téléphone" id="univ-tel">
                    <Input id="univ-tel" defaultValue="+225 27 00 00 000" className="h-9" />
                  </FieldRow>
                  <FieldRow label="Adresse" id="univ-adresse">
                    <Input id="univ-adresse" defaultValue="Abidjan, Côte d'Ivoire" className="h-9" />
                  </FieldRow>
                  <FieldRow label="Site web" id="univ-web">
                    <Input id="univ-web" defaultValue="https://www.univ.ci" className="h-9" />
                  </FieldRow>
                </FormSection>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── ACADÉMIQUE ── */}
          <TabsContent value="academique">
            <Card className="border border-card-border shadow-sm max-w-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Configuration académique</CardTitle>
                <CardDescription className="text-xs">Paramètres de l'année universitaire, des périodes et des seuils de validation.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormSection title="Année universitaire">
                  <FieldRow label="Année en cours" id="annee-courante">
                    <Select defaultValue="2024-2025">
                      <SelectTrigger id="annee-courante" className="h-9"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["2024-2025","2023-2024","2022-2023"].map(y=><SelectItem key={y} value={y}>{y}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </FieldRow>
                  <FieldRow label="Date de rentrée" id="date-rentree">
                    <Input id="date-rentree" type="date" defaultValue="2024-09-02" className="h-9" />
                  </FieldRow>
                  <FieldRow label="Date de clôture" id="date-cloture">
                    <Input id="date-cloture" type="date" defaultValue="2025-06-30" className="h-9" />
                  </FieldRow>
                </FormSection>
                <FormSection title="Inscriptions">
                  <FieldRow label="Ouverture des inscriptions" id="ins-debut">
                    <Input id="ins-debut" type="date" defaultValue="2024-07-01" className="h-9" />
                  </FieldRow>
                  <FieldRow label="Clôture des inscriptions L1" id="ins-fin">
                    <Input id="ins-fin" type="date" defaultValue="2024-07-31" className="h-9" />
                  </FieldRow>
                </FormSection>
                <FormSection title="Validation académique">
                  <FieldRow label="Note de passage (sur 20)" id="note-passage">
                    <Input id="note-passage" type="number" min="0" max="20" defaultValue="10" className="h-9 max-w-[120px]" />
                  </FieldRow>
                  <FieldRow label="Moyenne de validation" id="moy-valid">
                    <Input id="moy-valid" type="number" min="0" max="20" defaultValue="10" className="h-9 max-w-[120px]" />
                  </FieldRow>
                </FormSection>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── UTILISATEURS ── */}
          <TabsContent value="utilisateurs">
            <div className="space-y-4 max-w-4xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold">Comptes administrateurs</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">{adminUsers.length} comptes enregistrés</p>
                </div>
                <Button size="sm" className="h-9 gap-1.5">
                  <Users size={14} aria-hidden="true" />Nouvel utilisateur
                </Button>
              </div>
              <Card className="border border-card-border shadow-sm">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30">
                      <TableHead className="text-xs font-semibold uppercase tracking-wide">Utilisateur</TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wide hidden sm:table-cell">Rôle</TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wide hidden md:table-cell">Dernière connexion</TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wide">Statut</TableHead>
                      <TableHead className="sr-only">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adminUsers.map((u, i) => (
                      <TableRow key={u.id} className="hover:bg-muted/30">
                        <TableCell>
                          <div className="flex items-center gap-2.5">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-primary text-white text-xs font-bold">
                                {u.nom.split(" ").map(w=>w[0]).slice(0,2).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-semibold">{u.nom}</p>
                              <p className="text-xs text-muted-foreground">{u.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge variant={u.role === "Super Admin" ? "default" : "secondary"} className="text-xs">{u.role}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-xs text-muted-foreground">{u.derniere_connexion}</TableCell>
                        <TableCell>
                          {u.statut === "Actif"
                            ? <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">Actif</Badge>
                            : <Badge className="bg-gray-100 text-gray-600 border-gray-200 text-xs">Inactif</Badge>}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="h-7 text-xs" aria-label={`Modifier ${u.nom}`}>Modifier</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </TabsContent>

          {/* ── SÉCURITÉ ── */}
          <TabsContent value="securite">
            <Card className="border border-card-border shadow-sm max-w-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Sécurité & accès</CardTitle>
                <CardDescription className="text-xs">Politique de mot de passe et paramètres de sécurité du système.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormSection title="Mot de passe administrateur">
                  <FieldRow label="Nouveau mot de passe" id="new-pwd">
                    <div className="relative">
                      <Input id="new-pwd" type={showPwd ? "text" : "password"} placeholder="••••••••" className="h-9 pr-9" />
                      <button
                        type="button"
                        onClick={() => setShowPwd(p => !p)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        aria-label={showPwd ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                      >
                        {showPwd ? <EyeOff size={15} aria-hidden="true" /> : <Eye size={15} aria-hidden="true" />}
                      </button>
                    </div>
                  </FieldRow>
                  <FieldRow label="Confirmer" id="confirm-pwd">
                    <Input id="confirm-pwd" type="password" placeholder="••••••••" className="h-9" />
                  </FieldRow>
                </FormSection>

                <Separator />

                <FormSection title="Politique de sécurité">
                  {[
                    { id:"2fa", label:"Authentification à deux facteurs", desc:"Exiger la vérification en deux étapes pour les admins.", default:false },
                    { id:"session-timeout", label:"Déconnexion automatique", desc:"Déconnecter les sessions inactives après 30 minutes.", default:true },
                    { id:"log-access", label:"Journal des accès", desc:"Enregistrer toutes les connexions et actions des admins.", default:true },
                    { id:"ip-restrict", label:"Restriction par IP", desc:"Limiter l'accès à des adresses IP autorisées.", default:false },
                  ].map(opt => (
                    <div key={opt.id} className="flex items-start justify-between gap-4 py-2">
                      <div>
                        <p className="text-sm font-medium">{opt.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
                      </div>
                      <Switch defaultChecked={opt.default} aria-label={opt.label} />
                    </div>
                  ))}
                </FormSection>

                <Separator />

                <FormSection title="Sauvegarde">
                  <div className="flex items-start justify-between gap-4 py-2">
                    <div>
                      <p className="text-sm font-medium">Sauvegarde automatique</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Effectuer une sauvegarde complète chaque nuit à 02h00.</p>
                    </div>
                    <Switch defaultChecked aria-label="Sauvegarde automatique" />
                  </div>
                  <FieldRow label="Rétention (jours)" id="backup-retention">
                    <Input id="backup-retention" type="number" defaultValue="30" className="h-9 max-w-[120px]" />
                  </FieldRow>
                </FormSection>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
