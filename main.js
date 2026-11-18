document.querySelectorAll(".reroll").forEach((button) => {
    button.addEventListener("click", () => reroll(button.dataset.target));
});

var mom = { red: "Ee", agouti: "Ea", cream: "cc", roan: "rr", tobiano: "tt", dun: "Dd" } // bay
var dad = { red: "Ee", agouti: "aa", cream: "Cc", roan: "rr", tobiano: "tt", dun: "Dd" } // smoky black

const BASE_COLORS = {
    bay: "base-coats/bay.png",
    chestnut: "base-coats/chestnut.png",
    black: "base-coats/black.png",
    buckskin: "base-coats/buckskin.png",
    palomino: "base-coats/palomino.png",
};


// takes a genotype object and returns the phenotype name for the horse's base color
function getHorseBaseColor(genotype) {
    if (genotype.red === "ee") {
        if (genotype.cream.includes('C')) {
            return "palomino";
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
        console.log(`#${horseId} .overlays .${overlay}`);
        const img = document.querySelector(`#${horseId} .overlays .${overlay}`);
        img.style.visibility = "visible";
    }
}

function randomAllele(dominant, recessive) {
    return Math.random() < 0.5 ? dominant : recessive;
}

function randomGenotypes() {
    const red = randomAllele("E", "e") + randomAllele("E", "e");
    const agouti = randomAllele("A", "a") + randomAllele("A", "a");
    const cream = randomAllele("C", "c") + randomAllele("C", "c");
    const tobiano = randomAllele("T", "t") + randomAllele("t", "t");
    const roan = randomAllele("R", "r") + randomAllele("r", "r");
    const dun = randomAllele("D", "d") + randomAllele("d", "d");
    return { red, agouti, cream, tobiano, roan, dun };
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
        tobiano: randomAlleleFrom(mom.tobiano) + randomAlleleFrom(dad.tobiano),
        roan: randomAlleleFrom(mom.roan) + randomAlleleFrom(dad.roan),
        dun: randomAlleleFrom(mom.dun) + randomAlleleFrom(dad.dun),
    };
}