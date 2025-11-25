import { Filter, X } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { TypeBadge } from "./TypeBadge";

interface SearchFiltersProps {
  selectedType: string | null;
  selectedGeneration: string | null;
  sortBy: string;
  onTypeChange: (type: string | null) => void;
  onGenerationChange: (generation: string | null) => void;
  onSortChange: (sort: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

const pokemonTypes = [
  "normal", "fire", "water", "electric", "grass", "ice",
  "fighting", "poison", "ground", "flying", "psychic", "bug",
  "rock", "ghost", "dragon", "dark", "steel", "fairy"
];

const generations = [
  { value: "1", label: "Geração 1 (Kanto)", range: [1, 151] },
  { value: "2", label: "Geração 2 (Johto)", range: [152, 251] },
  { value: "3", label: "Geração 3 (Hoenn)", range: [252, 386] },
  { value: "4", label: "Geração 4 (Sinnoh)", range: [387, 493] },
  { value: "5", label: "Geração 5 (Unova)", range: [494, 649] },
  { value: "6", label: "Geração 6 (Kalos)", range: [650, 721] },
  { value: "7", label: "Geração 7 (Alola)", range: [722, 809] },
  { value: "8", label: "Geração 8 (Galar)", range: [810, 905] },
  { value: "9", label: "Geração 9 (Paldea)", range: [906, 1010] },
];

export function SearchFilters({
  selectedType,
  selectedGeneration,
  sortBy,
  onTypeChange,
  onGenerationChange,
  onSortChange,
  onClearFilters,
  hasActiveFilters
}: SearchFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center justify-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Tipo:</span>
          <Select value={selectedType || "all"} onValueChange={(value) => onTypeChange(value === "all" ? null : value)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              {pokemonTypes.map((type) => (
                <SelectItem key={type} value={type} className="capitalize">
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Geração:</span>
          <Select value={selectedGeneration || "all"} onValueChange={(value) => onGenerationChange(value === "all" ? null : value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as gerações</SelectItem>
              {generations.map((gen) => (
                <SelectItem key={gen.value} value={gen.value}>
                  {gen.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Ordenar:</span>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="number-asc">Número (↑)</SelectItem>
              <SelectItem value="number-desc">Número (↓)</SelectItem>
              <SelectItem value="name-asc">Nome (A-Z)</SelectItem>
              <SelectItem value="name-desc">Nome (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {hasActiveFilters && (
          <Button
            onClick={onClearFilters}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <X className="w-4 h-4" />
            Limpar filtros
          </Button>
        )}
      </div>
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 items-center justify-center">
          <span className="text-xs text-muted-foreground">Filtros ativos:</span>
          {selectedType && (
            <Badge variant="secondary" className="gap-1">
              Tipo: <TypeBadge type={selectedType} />
              <button
                onClick={() => onTypeChange(null)}
                className="ml-1 hover:text-destructive"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {selectedGeneration && (
            <Badge variant="secondary" className="gap-1">
              {generations.find(g => g.value === selectedGeneration)?.label}
              <button
                onClick={() => onGenerationChange(null)}
                className="ml-1 hover:text-destructive"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}

export function getGenerationRange(generation: string): [number, number] | null {
  const gen = generations.find(g => g.value === generation);
  return gen ? gen.range as [number, number] : null;
}
