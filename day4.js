
const fs = require('fs');

function parseData(nameFile){
	let listPassport = []
	try{
		const dataFile = fs.readFileSync(nameFile, 'UTF-8');
		const lines = dataFile.split(/\r?\n/);
		let dataPassport = {};
		lines.forEach( line => {
			if (line == ""){
				listPassport.push(dataPassport);
				dataPassport = {};
			}else{
				const arraryDataPassport =  line.split(" ");
				arraryDataPassport.forEach( dataPassporLine => {
					const partData = dataPassporLine.split(":")
					dataPassport[partData[0]] = partData[1];
				} )
			}
		} )

	}catch(exception){
		console.log(exception);
	}
	
	return listPassport;
}

function day4_1(data){

	let orderPassportData = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
	let countValidate = 0;
	data.forEach( dataPassport => {
		let existsKey = true;
		orderPassportData.forEach(keyPassportData => {
			if (!dataPassport[keyPassportData]){
				existsKey = false;
			}	
		})
		if (existsKey){
			countValidate +=1;
		}	
	} )

	return countValidate;
}

function isValidByr(data){
	data = parseInt(data);
	return 1920 <= data && data <= 2002;
}

function isValidIyr(data){
	data = parseInt(data);
	return 2010<= data && data <= 2020;
}

function isValidEyr(data){
	data = parseInt(data);
	return 2020<= data && data <= 2030;
}

function isValidHgt(data){
	let measuredType = data.slice(-2);
	let height = data.slice(0, data.length-2)
	if (measuredType == "in"){
		height = parseInt(height);
		return 59 <= height && height <= 76;
	}
	else if (measuredType == "cm"){
		height = parseInt(height);
		return 150<= height && height<= 193;
	}
	
	return false;
}

function isValidHcl(data){
	return /^#[a-f0-9]{6}$/.test(data)
}

function isValidEcl(data){
	const color = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]
	return color.includes(data);
}

function isValidPid(data){
	return /^[0-9]{9}$/.test(data)
}


function day4_2(data){
	const dicctionaryValidate = {"byr": isValidByr, "iyr": isValidIyr, "eyr": isValidEyr, "hgt": isValidHgt, "hcl": isValidHcl, "ecl": isValidEcl, "pid": isValidPid}

	let orderPassportData = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
	let countValidate = 0;
	data.forEach( dataPassport => {
		let existsKey = true;
		orderPassportData.forEach(keyPassportData => {
			if (!dataPassport[keyPassportData]){
				existsKey = false;
			}else{
				existsKey = existsKey && dicctionaryValidate[keyPassportData](dataPassport[keyPassportData])
			}	
		})
		if (existsKey){
			countValidate +=1;
		}	
	} )
	return countValidate
}

const data = parseData("test4_2");
const result = day4_2(data)
console.log(result)
