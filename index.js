const zlib = require('zlib');
const fs = require('fs');

const divisionsBuffer = zlib.gunzipSync(fs.readFileSync('./assets/divisions.json.gz'))
const divisions = JSON.parse(divisionsBuffer.toString())

const districtsBuffer = zlib.gunzipSync(fs.readFileSync('./assets/districts.json.gz'))
const districts = JSON.parse(districtsBuffer.toString())

const upazillasBuffer = zlib.gunzipSync(fs.readFileSync('./assets/upazillas.json.gz'))
const upazillas = JSON.parse(upazillasBuffer.toString())

const postOfficesBuffer = zlib.gunzipSync(fs.readFileSync('./assets/postoffices.json.gz'))
const postOffices = JSON.parse(postOfficesBuffer.toString())

const unionsBuffer = zlib.gunzipSync(fs.readFileSync('./assets/unions.json.gz'))
const unions = JSON.parse(unionsBuffer.toString())

class BD {
    static divisions(){
        return divisions.divisions
    }

    static districts(){
        return districts.districts
    }

    static district(id){
        if(!id){
            return {message : 'Plese insert a division id as params.'}
        }
        return this.districts()
        .filter(district=> district.division_id === id.toString())
    }

    static upazillas(){
        return upazillas.upazillas
    }

    static upazilla(id){
        if(!id){
            return {message : 'Plese insert a district id as params.'}
        }
        return this.upazillas()
        .filter(upazilla=> upazilla.district_id === id.toString())
    }

    static unions(){
        return unions.unions
    }

    static union(id){
        if(!id){
            return {message : 'Plese insert a upazilla id as params.'}
        }
        return this.unions()
        .filter(union=> union.upazilla_id === id.toString())
    }

    static postOffices(){
        return postOffices
    }

    static postOffice(id){
        if(!id){
            return {message : 'Plese insert a district id as params.'}
        }

        const district = this.districts().find(district=> district.id === id.toString())

        if(!district){
            return {message : 'Plese insert a district id as params.'}
        }

        const find = []

        const data = this.postOffices()

        for (const key in data){
            const entry = data[key]
            
            if(entry.bn && entry.bn.district.trim() === district.bn_name.trim()){
                find.push(entry.bn)
            }
        }

        return find
    }

}

console.log(BD.districts())