
const a ={
    'kk':0,
    'k1':1,
    'k2':2,
    'k4':4, 
    'sub': {
        'xx':0,
        'x1':1,
        'x2':2,
        'x4':4, 
    } 
};
const b ={
    'kk':0,
    'k1':1,
    'k3':3, 
    'k4':44, 
    'sub': {
        'xx':0,
        'x1':1,
        'x3':3, 
        'x4':44, 
    }
};


function ObjectsDiff(o1,o2) {
    const typeObject = function(o){
        return typeof o === 'object';
    };
    const diff = function (o1, o2) {
        const result = {};
        // if first is item is not object
        if (!typeObject(o1) && typeObject(o2)) {
            return o2;
        }
        // if second is item is not object
        else if (typeObject(o1) && !typeObject(o2)) {
            return undefined;
        }
        // if they are equal
        else if (Object.is(o1, o2)) {
            return undefined;
        }
        const keys = Object.keys(o2);
        for (let i=0; i<keys.length; i++) {
            const key = keys[i];
            // if both are objects
            if ( typeObject(o1[key]) && typeObject(o2[key])) {
                // if equal, return nothing
                if ( Object.is(o1[key], o2[key]) ) {
                    // do nothing
                } else if (o1[key] === o2[key]) {
                    // do nothing
                } else {
                    result[key] = diff(o1[key],o2[key]);
                }
            } else if (o1[key] !== o2[key]) {
                result[key] = o2[key];
            } else {
                // do nothing
            }
        }
        return result;
    };
    return [
        diff(o1,o2),
        diff(o2,o1),
    ];
}

console.log( ObjectsDiff (a,b));
