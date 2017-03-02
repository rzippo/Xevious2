var randomGenerator;
var gameSeed;

//Inizializza il generatore di numeri casuali
function loadGameSeed(seed)
{
	randomGenerator = seededRandomGenerator(seed);
	gameSeed = seed;

	//Il primo numero viene generato per determinare lo sfondo di gioco
	setBackground();
}

// Restituisce un generatore di numeri pseudocasuali definito dal seed passato come argomento
// Due generatori producono la stessa sequenza di numeri se inizializzati con lo stesso seed,
// e ciò è sfruttato nel meccanismo delle gare per permettere di avere la stessa sequenza di nemici

// Sorgente dell'implementazione:
// http://stackoverflow.com/questions/521295/javascript-random-seeds/23304189
function seededRandomGenerator(seed) 
{
	var m_w  = seed;
	var m_z  = 987654321;
	var mask = 0xffffffff;

	return function() 
	{
		m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
		m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;

		var result = ((m_z << 16) + m_w) & mask;
		result /= 4294967296;

		return result + 0.5;
	}
}
