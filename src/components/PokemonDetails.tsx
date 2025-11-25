import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { TypeBadge } from "./TypeBadge";
import { StatBar } from "./StatBar";
import { Pokemon } from "../data/pokemonData";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PokemonDetailsProps {
  pokemon: Pokemon;
  onBack: () => void;
  onPokemonClick?: (id: number) => void;
  pokemonList: Pokemon[];
}

export function PokemonDetails({ pokemon, onBack, onPokemonClick, pokemonList }: PokemonDetailsProps) {
  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar à Pokédex
        </Button>

        <Card className="p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0 md:w-1/3">
              <div className="bg-gradient-to-br from-muted to-background rounded-xl p-8 aspect-square flex items-center justify-center">
                <ImageWithFallback
                  src={pokemon.image}
                  alt={pokemon.name}
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            <div className="flex-1 space-y-6">
              <div>
                <p className="text-muted-foreground mb-2">#{pokemon.id.toString().padStart(3, '0')}</p>
                <h1 className="capitalize mb-4">{pokemon.name}</h1>
                <div className="flex gap-2 flex-wrap">
                  {pokemon.types.map((type) => (
                    <TypeBadge key={type} type={type} />
                  ))}
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">{pokemon.description}</p>

              <div className="space-y-3">
                <h3>Estatísticas Base</h3>
                <StatBar label="Ataque" value={pokemon.stats.attack} maxValue={350} color="bg-red-500" />
                <StatBar label="Defesa" value={pokemon.stats.defense} maxValue={350} color="bg-blue-500" />
                <StatBar label="Stamina" value={pokemon.stats.stamina} maxValue={350} color="bg-green-500" />
              </div>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="mb-4">Fast Moves</h3>
            <div className="space-y-2">
              {pokemon.fastMoves.map((move) => (
                <div key={move} className="px-4 py-2 bg-muted rounded-lg">
                  {move}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">Charged Moves</h3>
            <div className="space-y-2">
              {pokemon.chargedMoves.map((move) => (
                <div key={move} className="px-4 py-2 bg-muted rounded-lg">
                  {move}
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="mb-4">Forte contra</h3>
            <div className="flex gap-2 flex-wrap">
              {pokemon.strengths.map((type) => (
                <TypeBadge key={type} type={type} />
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">Fraco contra</h3>
            <div className="flex gap-2 flex-wrap">
              {pokemon.weaknesses.map((type) => (
                <TypeBadge key={type} type={type} />
              ))}
            </div>
          </Card>
        </div>

        {pokemon.evolutionChain && pokemon.evolutionChain.length > 1 && (
          <Card className="p-6">
            <h3 className="mb-6">Linha Evolutiva</h3>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {pokemon.evolutionChain.map((pokemonId, index) => {
                const evolutionPokemon = pokemonList.find(p => p.id === pokemonId);
                const isCurrentPokemon = pokemonId === pokemon.id;

                if (!evolutionPokemon) return null;

                return (
                  <div key={pokemonId} className="flex items-center gap-4">
                    <div
                      className={`flex flex-col items-center gap-2 ${
                        isCurrentPokemon ? '' : 'cursor-pointer hover:opacity-70 transition-opacity'
                      }`}
                      onClick={() => !isCurrentPokemon && onPokemonClick?.(pokemonId)}
                    >
                      <div
                        className={`${
                          isCurrentPokemon
                            ? 'w-28 h-28 bg-gradient-to-br from-accent/20 to-primary/10 border-2 border-accent'
                            : 'w-24 h-24 bg-gradient-to-br from-muted to-background'
                        } rounded-lg p-3 flex items-center justify-center`}
                      >
                        <ImageWithFallback
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
                          alt={evolutionPokemon.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="text-center">
                        <p className={`text-sm capitalize ${isCurrentPokemon ? '' : 'text-sm'}`}>
                          {evolutionPokemon.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          #{pokemonId.toString().padStart(3, '0')}
                        </p>
                      </div>
                    </div>

                    {index < pokemon.evolutionChain.length - 1 && (
                      <div className="text-2xl text-muted-foreground mb-8">→</div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
