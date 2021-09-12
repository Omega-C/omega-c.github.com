class Table {
	constructor() {
		this.replacables={"⇒":"<=","->":"<=","→":"<=","⊃":"<=","<->":"==","⇔":"==","≡":"==","⟷":"==","¬":"1^","~":"1^","!":"1^","∧":"&","∨":"|","⊤":"1","⊥":"0"}
	}
	sanitise(str) {
		return(str)
	}
	readVariables(str) {
		let varRegex=/\w+/g
		return([...(new Set([...str.matchAll(varRegex)].map(x=>{return(x[0])})))].sort((a, b)=>{return(b.length-a.length)}))
	}
	binaryMake(varint) {
		let binaryList=[]
		for (let n=0; n<2**varint;n++) {
			binaryList.push(Number(n).toString(2).padStart(varint,"0").split(""))
		}
		return(binaryList)
	}
	replaceVars(str) {
		for (let key in this.replacables) {
			str=str.replaceAll(key,this.replacables[key])
		}
		return(str)
	}
	tableInterpretation(arr) {
		if ((arr.includes(1))&(arr.includes(0))) {return("Possible")}
		if (arr.includes(1)) {return("Tautology")}
		if (arr.includes(0)) {return("Contradiction")}
		return("Vacuious")
	}
	makeTable(str) {
		str=this.sanitise(str)
		let resultant=[]
		let variables=this.readVariables(str)
		let binaryKey=this.binaryMake(variables.length).reverse()
		str=this.replaceVars(str)
		binaryKey.forEach(function (item,index) {
			let news=str
			for (let n=0;n<item.length;n++) {
				news=news.replaceAll(variables[n],item[n])
			}
			resultant.push(eval(news))
		})
		return([variables,resultant,binaryKey,this.tableInterpretation(resultant)])
	}
}
