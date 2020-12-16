// Add packages
require("dotenv").config();
const { RSA_NO_PADDING } = require("constants");
const { query } = require("express");
// Add database package and connection string
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

const getTotalRecords = () => {
    sql = "SELECT COUNT(*) FROM customer";
    return pool.query(sql)
        .then(result => {
            return {
                msg: "success",
                totRecords: result.rows[0].count
            }
        })
        .catch(err => {
            return {
                msg: `Error: ${err.message}`
            }
        });
};

const findCustomers = (customer) => {
    // Will build query based on data provided from the form
    //  Use parameters to avoid sql injection

    // Declare variables
    var i = 1;
    params = [];
    sql = "SELECT * FROM CUSTOMER WHERE true";

    // Check data provided and build query as necessary
    if (customer.cusId !== "") {
        params.push(parseInt(customer.cusId));
        sql += ` AND cusId = $${i}`;
        i++;
    };
    if (customer.cusFname !== "") {
        params.push(`${customer.cusFname}%`);
        sql += ` AND UPPER(cusFname) LIKE UPPER($${i})`;
        i++;
    };
    if (customer.cusLname !== "") {
        params.push(`${customer.cusLname}%`);
        sql += ` AND UPPER(cusLname) LIKE UPPER($${i})`;
        i++;
    };
    if (customer.cusState !== "") {
        params.push(`${customer.cusState}%`);
        sql += ` AND UPPER(cusState) LIKE UPPER($${i})`;
        i++;
    };
    if (customer.cusSalesYTD !== "") {
        params.push(parseFloat(customer.cusSalesYTD));
        sql += ` AND cusSalesYTD >= $${i}`;
        i++;
    };
    if (customer.cusSalesPrev !== "") {
        params.push(parseFloat(customer.cusSalesPrev));
        sql += ` AND cusSalesPrev >= $${i}`;
        i++;
    };

    sql += ` ORDER BY cusId`;
    // for debugging
     console.log("sql: " + sql);
     console.log("params: " + params);

    return pool.query(sql, params)
        .then(result => {
            return { 
                trans: "success",
                result: result.rows
            }
        })
        .catch(err => {
            return {
                trans: "Error",
                result: `Error: ${err.message}`
            }
        });
};

const createCustomer = () => {
    var newId = document.createElement(this.cusId);
    var newFname = document.createElement(this.cusFname);
    var newLname = document.createElement(this.cusLname);
    var newState = document.createElement(this.cusState);
    var newSalesYTD = document.createElement(this.cusSalesYTD);
    var newSalesPrev = document.createElement(this.cusSalesPrev);

    var sql = "INSERT INTO customers (cusId, cusFname, cusLname, cusState, cusSalesYTD, cusSalesPrev) VALUES ($this.cusId, this.cusFname, this.cusLname, this.cusState, this.cusSalesYTD, this.cusSalesPrev)"
    return pool.query(sql)
        .then(result => {
            return { 
                trans: "success",
                result: result
            }
        })
        .catch(err => {
            return {
                trans: "Error",
                result: `Error: ${err.message}`
            }
        });

}

const deleteCustomer = (customer) => {
    var tbd = document.getElementById(customer).value;
    return pool.query(tbd)
    .then(result => {
        return { 
            trans: "success",
            result: tbd.value = " "
        }
    })
    .catch(err => {
        return {
            trans: "Error",
            result: `Error: ${err.message}`
        }
    });

}

const editCustomer = (customer) => {
    var tbdfname = document.getElementById(customer.cusFname).value;
    var tbdlname = document.getElementById(customer.cusLname).value;
    var tbdstate = document.getElementById(customer.cusState).value;
    var tbdsalesytd = document.getElementById(customer.cusSalesYTD).value;
    var tbdsalesprev = document.getElementById(customer.cusSalesPrev).value;

    return pool.query()
    .then(result => {
        return { 
            trans: "success",
            result: `${customer.cusId},${customer.cusFname},${customer.cusLname},${customer.cusState},${customer.cusSalesYTD},${customer.cusSalesPrev}\r\n`
        }
    })
    .catch(err => {
        return {
            trans: "Error",
            result: `Error: ${err.message}`
        }
    });
    
}

const sortLnameFname = (customer) => {
    var i = 1;
    params = [];
    sql = "SELECT * FROM CUSTOMER ORDER BY cusLname, cusFname";

    if (customer.cusId !== "") {
        params.push(parseInt(customer.cusId));
        i++;
    };
    if (customer.cusFname !== "") {
        params.push(`${customer.cusFname}%`);
        i++;
    };
    if (customer.cusLname !== "") {
        params.push(`${customer.cusLname}%`);
        i++;
    };
    if (customer.cusState !== "") {
        params.push(`${customer.cusState}%`);
        i++;
    };
    if (customer.cusSalesYTD !== "") {
        params.push(parseFloat(customer.cusSalesYTD));
        i++;
    };
    if (customer.cusSalesPrev !== "") {
        params.push(parseFloat(customer.cusSalesPrev));
        i++;
    };

     console.log("sql: " + sql);
     console.log("params: " + params);

    return pool.query(sql, params)
        .then(result => {
            return { 
                trans: "success",
                result: result.rows
            }
        })
        .catch(err => {
            return {
                trans: "Error",
                result: `Error: ${err.message}`
            }
        });
};

const sortDecSales = () => {
    var i = 1;
    params = [];
    sql = "SELECT * FROM CUSTOMER ORDER BY cusSalesYTD DESC";

    if (customer.cusId !== "") {
        params.push(parseInt(customer.cusId));
        i++;
    };
    if (customer.cusFname !== "") {
        params.push(`${customer.cusFname}%`);
        i++;
    };
    if (customer.cusLname !== "") {
        params.push(`${customer.cusLname}%`);
        i++;
    };
    if (customer.cusState !== "") {
        params.push(`${customer.cusState}%`);
        i++;
    };
    if (customer.cusSalesYTD !== "") {
        params.push(parseFloat(customer.cusSalesYTD));
        i++;
    };
    if (customer.cusSalesPrev !== "") {
        params.push(parseFloat(customer.cusSalesPrev));
        i++;
    };

     console.log("sql: " + sql);
     console.log("params: " + params);

    return pool.query(sql, params)
        .then(result => {
            return { 
                trans: "success",
                result: result.rows
            }
        })
        .catch(err => {
            return {
                trans: "Error",
                result: `Error: ${err.message}`
            }
        });
}

const sortThreeRand = () => {
    var i = 1;
    params = [];
    sql = "SELECT * FROM CUSTOMER ORDER BY RAND() LIMIT 3";

    if (customer.cusId !== "") {
        params.push(parseInt(customer.cusId));
        i++;
    };
    if (customer.cusFname !== "") {
        params.push(`${customer.cusFname}%`);
        i++;
    };
    if (customer.cusLname !== "") {
        params.push(`${customer.cusLname}%`);
        i++;
    };
    if (customer.cusState !== "") {
        params.push(`${customer.cusState}%`);
        i++;
    };
    if (customer.cusSalesYTD !== "") {
        params.push(parseFloat(customer.cusSalesYTD));
        i++;
    };
    if (customer.cusSalesPrev !== "") {
        params.push(parseFloat(customer.cusSalesPrev));
        i++;
    };

     console.log("sql: " + sql);
     console.log("params: " + params);

    return pool.query(sql, params)
        .then(result => {
            return { 
                trans: "success",
                result: result.rows
            }
        })
        .catch(err => {
            return {
                trans: "Error",
                result: `Error: ${err.message}`
            }
        });
}

const exportFile = () => {
    sql = "SELECT * FROM customer ORDER BY cusId";
    var output = ""
    return pool.query(sql, [])
        .then(result => {
            return {
                trans: "success",
                result: result.rows.forEach(customer => {
                    output += `${customer.cusId},${customer.cusFname},${customer.cusLname},${customer.cusState},${customer.cusSalesYTD},${customer.cusSalesPrev}\r\n`;
                })
            }
        })
        .catch(err => {
            return {
                trans: "Error",
                result: `Error: ${err.message}`
            }
        })
    //         res.header("Content-Type", "text/csv");
    //         res.attachment("export.csv");
    //         return res.send(output);
    //     };
    // });

};


module.exports.getTotalRecords = getTotalRecords;
module.exports.findCustomers = findCustomers;
module.exports.createCustomer = createCustomer;
module.exports.deleteCustomer = deleteCustomer;
module.exports.editCustomer = editCustomer;
module.exports.sortLnameFname = sortLnameFname;
module.exports.sortDecSales = sortDecSales;
module.exports.sortThreeRand = sortThreeRand;
module.exports.exportFile = exportFile;