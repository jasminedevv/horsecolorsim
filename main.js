document.querySelectorAll(".reroll").forEach((button) => {
    button.addEventListener("click", () => reroll(button.dataset.target));
});

var mom = { red: "Ee", agouti: "Ea", cream: "cc", roan: "rr", tobiano: "tt", dun: "Dd", gray:"gg" } // bay
var dad = { red: "Ee", agouti: "aa", cream: "Cc", roan: "rr", tobiano: "tt", dun: "Dd", gray:"gg"  } // smoky black

const BASE_COLORS = {
    bay: "base-coats/bay.png",
    chestnut: "base-coats/chestnut.png",
    black: "base-coats/black.png",
    buckskin: "base-coats/buckskin.png",
    palomino: "base-coats/palomino.png",
    cream: "base-coats/cream.png",
    gray: "base-coats/gray.png",
};


// takes a genotype object and returns the phenotype name for the horse's base color
function getHorseBaseColor(genotype) {
    if (genotype.gray.includes('G')) {
        return "gray"
    }
    if (genotype.red === "ee") {
        if (genotype.cream.includes('C')) {
            if (genotype.cream === "CC") {
                return "cream"
            } else {
                return "palomino";
            }
        } else {
            return "chestnut";
        }
    } else if (genotype.agouti === 'aa') {
        return "black"
    } else {
        if (genotype.cream.includes('C')) {
            return "buckskin";
        } else {
            return "bay";
        }
    }
}

function getHorseOverlays(genotype) {
    const overlays = [];

    if (genotype.roan.includes("R")) overlays.push("roan");
    if (genotype.tobiano.includes("T")) overlays.push("tobiano");
    if (genotype.dun.includes("D")) overlays.push("dun");

    return overlays;
}

function swapBaseColor(baseColor, horseId) {
    const src = BASE_COLORS[baseColor];
    const img = document.querySelector(`#${horseId} .horse-base`);
    img.src = src;
}

function swapOverlays(overlays, horseId) {
    const overlayImages = document.querySelectorAll(`#${horseId} .overlays img`);

    for (const img of overlayImages) {
        img.style.visibility = "hidden";
    }

    for (const overlay of overlays) {
        const img = document.querySelector(`#${horseId} .overlays .${overlay}`);
        img.style.visibility = "visible";
    }
}


const GENES = {
  red:     { dominant: "E", recessive: "e", rarity: "0.4" },
  agouti:  { dominant: "A", recessive: "a", rarity: "0.5" },
  cream:   { dominant: "C", recessive: "c", rarity: "0.2" },
  tobiano: { dominant: "T", recessive: "t", rarity: "0.2" },
  roan:    { dominant: "R", recessive: "r", rarity: "0.2" },
  dun:     { dominant: "D", recessive: "d", rarity: "0.4" },
  gray:    { dominant: "G", recessive: "g", rarity: "0.1" },
};

function randomAllele(gene) {
  return Math.random() < gene.rarity ? gene.dominant : gene.recessive;
}

// todo: rewrite these confusing ass functions
function randomGenotype(gene) {
  const first = randomAllele(gene);
  const second = gene.maxDominant === 1 ? gene.recessive : randomAllele(gene);
  return first + second;
}

function randomGenotypes() {
  return Object.fromEntries(
    Object.entries(GENES).map(([name, gene]) => [name, randomGenotype(gene)])
  );
}

function reroll(horse) {
    if (horse === "horse-foal") {
        var genotype = getFoalGenotype(mom, dad);
        var baseColor = getHorseBaseColor(genotype);
        var overlays = getHorseOverlays(genotype)
    } else if (horse === "horse-mom") {
        mom = randomGenotypes();
        var baseColor = getHorseBaseColor(mom);
        var overlays = getHorseOverlays(mom)
    } else if (horse === "horse-dad") {
        dad = randomGenotypes();
        var baseColor = getHorseBaseColor(dad);
        var overlays = getHorseOverlays(dad)
    }
    swapBaseColor(baseColor, horse);
    swapOverlays(overlays, horse)
}

function randomAlleleFrom(gene) {
    const randomIndex = Math.floor(Math.random() * gene.length);
    return gene[randomIndex];
}

function getFoalGenotype(mom, dad) {
    return {
        red: randomAlleleFrom(mom.red) + randomAlleleFrom(dad.red),
        agouti: randomAlleleFrom(mom.agouti) + randomAlleleFrom(dad.agouti),
        cream: randomAlleleFrom(mom.cream) + randomAlleleFrom(dad.cream),
        gray: randomAlleleFrom(mom.gray) + randomAlleleFrom(dad.gray),
        tobiano: randomAlleleFrom(mom.tobiano) + randomAlleleFrom(dad.tobiano),
        roan: randomAlleleFrom(mom.roan) + randomAlleleFrom(dad.roan),
        dun: randomAlleleFrom(mom.dun) + randomAlleleFrom(dad.dun),
    };
}