import date from '../helpers/date';

const amigoRepository = {
    async getDraws(today : boolean = false): Promise<[]>{
        try {
            const currentDate = date.currenDate();
            const httpCall = await fetch(`https://www.fdj.fr/api/service-draws/v1/games/amigo/draws?include=results,attributes&order=-draw_day_index&range=0-250${today ? `&drawn_at=${currentDate}` : ""}`);
            const response = await httpCall.json();
            const parsedResponse: [] = response.map((draw: any) => draw.results.map((number: any) => Number(number.value)));
            
            return parsedResponse;
        } catch (error) {
            console.log(error);
        }
        
        return [];
    }
}

export default amigoRepository