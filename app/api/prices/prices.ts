export async function getAgrotokenPricing() {
    try {
        const response = await fetch('https://api.agrotoken.io/v1/pricing');
        if (!response.ok) {
            throw new Error('Error fetching data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch Agrotoken pricing:', error);
        return null;
    }
}
